import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    mail: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS
    },
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET
    }
};

export default config;
