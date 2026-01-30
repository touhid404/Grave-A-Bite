# GrabABite

GrabABite is a food ordering and management app that connects hungry customers with local food sellers. It also gives admins the tools they need to manage the whole platform smoothly.

## User Roles and Features

### Admin
Admins look after the platform to make sure everything runs well.
- User Management: Change user accounts status and their roles.
- Provider Requests: Approve or reject customers who want to sell food.
- Reports: View details of all users and providers.
- App Settings: Manage food categories and other settings.

### Provider
Sellers use a private dashboard to run their food business.
- Dashboard: See total money made, active orders, and how many meals are on the menu.
- Menu Management: Easily add new food items, update prices, and change descriptions.
- Order Tracking: Move orders from "Placed" all the way to "Delivered" with a few clicks.
- Shop Profile: Update your shop name, address, and the type of food you serve.

### Customer
Customers have an easy way to find and order their favorite meals.
- Browse Food: Search for food by category or by specific shops.
- Track Orders: Get real-time updates on your order status from start to finish.
- Profile: Manage your personal details and contact info safely.
- Become a Provider: Apply to become a food provider directly from your account.

## Tech Stack

### Frontend
- Framework: Next.js 16 (React 19)
- Language: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- State: Zustand
- Forms: TanStack Form
- UI: Radix UI / Shadcn
- Auth: Better Auth

### Backend
- Language: TypeScript
- Server: Express.js
- Database Tool: Prisma
- Database: PostgreSQL
- Media Storage: Cloudinary
- Emails: Nodemailer

## Installation

Follow these steps to set up the project on your computer.

### 1. Clone the Project
```bash
git clone https://github.com/touhid404/Grave-A-Bite.git
cd Grave-A-Bite
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file following .env.example and add your keys
npx prisma generate
npm run dev
```

### 3. Setup Frontend
```bash
# Open a new terminal
cd frontend
npm install
# Create a .env file following .env.example and add your keys
npm run dev
```
