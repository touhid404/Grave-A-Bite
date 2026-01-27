import fs from 'fs';
import path from 'path';

const backendUrl = 'http://localhost:5000';

async function register() {
    const email = `test_${Date.now()}@example.com`;
    console.log(`Registering user with email: ${email}`);

    // The endpoint might be /api/auth/sign-up/email based on better-auth defaults
    const res = await fetch(`${backendUrl}/api/auth/sign-up/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({
            email,
            password: 'password123',
            name: 'Test User'
        })
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('Registration failed:', res.status, text);
        process.exit(1);
    }

    console.log('Registration request sent. Waiting for verification link file...');
}

async function verify() {
    // File is written to backend root (CWD of process)
    // Adjust path based on where this script is run from.
    // Assuming run from backend root:
    const filePath = path.join(process.cwd(), 'verification-link.txt');
    console.log(`Looking for file at: ${filePath}`);

    // Polling for file
    let attempts = 0;
    while (!fs.existsSync(filePath) && attempts < 20) {
        await new Promise(r => setTimeout(r, 500));
        attempts++;
        if (attempts % 5 === 0) console.log('Waiting for verification link file...');
    }

    if (!fs.existsSync(filePath)) {
        console.error('Verification link file not found after waiting.');
        process.exit(1);
    }

    const url = fs.readFileSync(filePath, 'utf-8').trim();
    console.log(`Verification URL found: ${url}`);

    // Extract token
    // URL format: http://localhost:3000/verify-email?token=abc...
    const urlObj = new URL(url);
    const token = urlObj.searchParams.get('token');

    if (!token) {
        console.error('Token not found in URL');
        process.exit(1);
    }

    console.log(`Extracted token: ${token}`);

    console.log('Calling backend verification endpoint with POST (better-auth default)...');
    // try POST first, as it modifies state
    const verifyRes = await fetch(`${backendUrl}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({ token })
    });

    if (verifyRes.ok) {
        console.log('Verification successful!');
        const text = await verifyRes.text();
        console.log('Response:', text);
    } else {
        console.log('POST failed, trying GET...');
        const verifyResGet = await fetch(`${backendUrl}/api/auth/verify-email?token=${token}`, {
            method: 'GET'
        });

        if (verifyResGet.ok) {
            console.log('Verification successful (GET)!');
            const text = await verifyResGet.text();
            console.log('Response:', text);
        } else {
            console.error('Verification failed (both POST and GET):', verifyRes.status, verifyResGet.status);
            const text = await verifyRes.text();
            console.error('Response POST:', text);
            const textGet = await verifyResGet.text();
            console.error('Response GET:', textGet);
        }
    }
}

(async () => {
    // Clean up old file
    const filePath = path.join(process.cwd(), 'verification-link.txt');
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await register();
    await verify();
})();
