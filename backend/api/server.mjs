var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3e3,
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
var config_default = config;

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role   String? @default("CUSTOMER")\n  phone  String?\n  status String? @default("ACTIVE")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\n// Food Schema - FoodHub specific models\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nmodel ProviderProfile {\n  id          String   @id @default(cuid())\n  userId      String   @unique\n  storeName   String\n  description String?\n  address     String\n  logo        String?\n  cuisineType String?\n  isApproved  Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  meals Meal[]\n\n  @@map("provider_profile")\n}\n\nmodel Category {\n  id          String   @id @default(cuid())\n  name        String   @unique\n  description String?\n  image       String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  meals Meal[]\n\n  @@map("category")\n}\n\nmodel Meal {\n  id          String   @id @default(cuid())\n  name        String\n  description String?\n  price       Float\n  image       String?\n  isAvailable Boolean  @default(true)\n  dietary     String[] // e.g., ["vegetarian", "gluten-free"]\n  providerId  String\n  categoryId  String\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  provider   ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade)\n  category   Category        @relation(fields: [categoryId], references: [id])\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  @@map("meal")\n}\n\nmodel Order {\n  id              String      @id @default(cuid())\n  customerId      String\n  status          OrderStatus @default(PLACED)\n  totalAmount     Float\n  deliveryAddress String\n  deliveryPhone   String\n  notes           String?\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n\n  orderItems OrderItem[]\n\n  @@map("order")\n}\n\nmodel OrderItem {\n  id       String @id @default(cuid())\n  orderId  String\n  mealId   String\n  quantity Int\n  price    Float\n\n  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  meal  Meal  @relation(fields: [mealId], references: [id])\n\n  @@map("order_item")\n}\n\nmodel Review {\n  id        String   @id @default(cuid())\n  rating    Int // 1-5\n  comment   String?\n  mealId    String\n  userId    String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  meal Meal @relation(fields: [mealId], references: [id], onDelete: Cascade)\n\n  @@unique([mealId, userId])\n  @@map("review")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"storeName","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"cuisineType","kind":"scalar","type":"String"},{"name":"isApproved","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"}],"dbName":"provider_profile"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":"category"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"dietary","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":"meal"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"deliveryPhone","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"order"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":"order_item"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"}],"dbName":"review"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MealScalarFieldEnum: () => MealScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  ProviderProfile: "ProviderProfile",
  Category: "Category",
  Meal: "Meal",
  Order: "Order",
  OrderItem: "OrderItem",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  storeName: "storeName",
  description: "description",
  address: "address",
  logo: "logo",
  cuisineType: "cuisineType",
  isApproved: "isApproved",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MealScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  image: "image",
  isAvailable: "isAvailable",
  dietary: "dietary",
  providerId: "providerId",
  categoryId: "categoryId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  status: "status",
  totalAmount: "totalAmount",
  deliveryAddress: "deliveryAddress",
  deliveryPhone: "deliveryPhone",
  notes: "notes",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  mealId: "mealId",
  quantity: "quantity",
  price: "price"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  mealId: "mealId",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${config_default.database_url}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";

// src/templates/emailVerification.ts
var getEmailVerificationTemplate = (userName, verificationUrl) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verification Protocol | GrabABite</title>
  <style type="text/css">
    body { margin: 0; padding: 0; background-color: #030712; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif; }
    table { border-collapse: collapse; }
    .main-wrapper { padding: 40px 20px; }
    .container { max-width: 600px; background-color: #09090b; border-radius: 48px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5); }
    
    .glow-header { background: radial-gradient(circle at 50% 0%, rgba(212, 255, 51, 0.15) 0%, transparent 70%); padding: 60px 40px 30px; text-align: center; }
    .brand-accent { display: inline-block; padding: 8px 16px; background: rgba(212, 255, 51, 0.05); border: 1px solid rgba(212, 255, 51, 0.2); border-radius: 100px; margin-bottom: 24px; }
    .brand-accent-text { color: #D4FF33; font-size: 10px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; }
    
    .logo-text { font-size: 38px; font-weight: 900; color: #ffffff; letter-spacing: -2px; text-transform: uppercase; font-style: italic; margin: 0; }
    .logo-text span { color: #D4FF33; font-style: normal; }
    
    .hero-content { padding: 0 50px 40px; text-align: center; }
    .display-heading { font-size: 48px; color: #ffffff; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -3px; line-height: 0.9; margin: 0 0 25px 0; }
    .highlight { color: #D4FF33; }
    
    .body-copy { font-size: 16px; color: #94a3b8; line-height: 1.6; font-weight: 500; margin-bottom: 40px; }
    .user-greeting { color: #ffffff; font-weight: 700; }
    
    .action-zone { background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 50px 40px; text-align: center; }
    .verify-btn { background-color: #D4FF33; color: #000000 !important; padding: 24px 60px; text-decoration: none; font-weight: 900; border-radius: 30px; display: inline-block; text-transform: uppercase; font-style: italic; font-size: 20px; letter-spacing: -0.5px; box-shadow: 0 20px 40px -10px rgba(212, 255, 51, 0.3); }
    
    .meta-details { padding: 40px 50px; text-align: center; color: #475569; font-size: 12px; font-weight: 600; line-height: 1.5; }
    .security-token { display: inline-block; margin-top: 15px; padding: 6px 12px; background: rgba(255,255,255,0.03); border-radius: 8px; font-family: monospace; color: #64748b; }
    
    .footer { background-color: #020617; padding: 50px 40px; text-align: center; }
    .footer-brand { color: #ffffff; font-weight: 900; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
    .footer-tag { color: #D4FF33; opacity: 0.6; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; font-style: italic; }
  </style>
</head>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="main-wrapper">
    <tr>
      <td align="center">
        <table class="container" width="600" border="0" cellspacing="0" cellpadding="0">
          <!-- Header with Radial Glow -->
          <tr>
            <td class="glow-header">
              <div class="brand-accent">
                <span class="brand-accent-text">Secure Access</span>
              </div>
              <h1 class="logo-text">GrabA<span>Bite</span></h1>
            </td>
          </tr>
          
          <!-- Hero Text -->
          <tr>
            <td class="hero-content">
              <h2 class="display-heading">VERIFY YOUR <span class="highlight">IDENTITY</span></h2>
              <p class="body-copy">
                Hello <span class="user-greeting">${userName}</span>,<br /><br />
                Welcome to the local culinary elite. You're one step away from unlocking visionary flavors. Authenticate your account to proceed.
              </p>
            </td>
          </tr>
          
          <!-- Call to Action Section -->
          <tr>
            <td class="action-zone">
              <a href="${verificationUrl}" class="verify-btn">Authenticate Now</a>
            </td>
          </tr>
          
          <!-- Security Notice -->
          <tr>
            <td class="meta-details">
              This verification protocol expires in 24 hours.<br />
              If you did not initiate this request, no action is required.
              <div class="security-token">ID: GB-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <div class="footer-brand">GrabABite &copy; 2026</div>
              <div class="footer-tag">Flavor Architecture</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

// src/lib/auth.ts
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: config_default.mail.user,
    pass: config_default.mail.pass
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [config_default.app_url],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${config_default.app_url}/verify-email?token=${token}`;
        await transporter.sendMail({
          from: '"GrabABite" <noreply@grab-a-bite.com>',
          to: user.email,
          subject: "Verify your GrabABite account",
          html: getEmailVerificationTemplate(user.name, verificationUrl)
        });
        console.log("Premium verification email sent to:", user.email);
      } catch (err) {
        console.error("Failed to send premium verification email:", err);
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: config_default.google.client_id,
      clientSecret: config_default.google.client_secret
    }
  }
});

// src/app.ts
import cors from "cors";

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your creditials!";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/providerManagement/providerManagement.routes.ts
import { Router } from "express";

// src/modules/providerManagement/providerManagement.service.ts
var addMeal = async (userId, mealData) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return await prisma.meal.create({
    data: {
      ...mealData,
      providerId: provider.id
    }
  });
};
var updateMeal = async (userId, mealId, mealData) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal || meal.providerId !== provider.id) {
    throw new Error("Unauthorized or meal not found");
  }
  return await prisma.meal.update({
    where: { id: mealId },
    data: mealData
  });
};
var deleteMeal = async (userId, mealId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal || meal.providerId !== provider.id) {
    throw new Error("Unauthorized or meal not found");
  }
  return await prisma.meal.delete({
    where: { id: mealId }
  });
};
var updateOrderStatus = async (orderId, status) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};
var getProviderOrders = async (userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return await prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          meal: {
            providerId: provider.id
          }
        }
      }
    },
    include: {
      orderItems: {
        where: {
          meal: {
            providerId: provider.id
          }
        },
        include: {
          meal: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getOrderById = async (userId, orderId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        where: {
          meal: {
            providerId: provider.id
          }
        },
        include: {
          meal: true
        }
      }
    }
  });
};
var getProviderMeals = async (userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return await prisma.meal.findMany({
    where: { providerId: provider.id },
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });
};
var getProfile = async (userId) => {
  return await prisma.providerProfile.findUnique({
    where: { userId }
  });
};
var updateProfile = async (userId, profileData) => {
  return await prisma.providerProfile.update({
    where: { userId },
    data: profileData
  });
};
var ProviderManagementService = {
  addMeal,
  updateMeal,
  deleteMeal,
  updateOrderStatus,
  getProviderOrders,
  getOrderById,
  getProviderMeals,
  getProfile,
  updateProfile
};

// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var uploadToCloudinary = async (buffer, folder = "grababite") => {
  console.log(`Cloudinary: Starting upload to folder "${folder}"...`);
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image"
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary: Upload error:", error);
          reject(error);
        } else if (result) {
          console.log("Cloudinary: Upload successful:", result.secure_url);
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        }
      }
    );
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// src/modules/providerManagement/providerManagement.controller.ts
var addMeal2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    let mealData = { ...req.body };
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "grababite/meals");
      mealData.image = uploadResult.url;
    }
    if (mealData.price) {
      mealData.price = parseFloat(mealData.price);
    }
    if (mealData["dietary[]"]) {
      mealData.dietary = Array.isArray(mealData["dietary[]"]) ? mealData["dietary[]"] : [mealData["dietary[]"]];
      delete mealData["dietary[]"];
    }
    const meal = await ProviderManagementService.addMeal(userId, mealData);
    res.status(201).json({
      success: true,
      data: meal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateMeal2 = async (req, res) => {
  try {
    const mealId = req.params.id;
    const userId = req.user?.id;
    let mealData = { ...req.body };
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "grababite/meals");
      mealData.image = uploadResult.url;
    }
    if (mealData.price) {
      mealData.price = parseFloat(mealData.price);
    }
    if (mealData["dietary[]"]) {
      mealData.dietary = Array.isArray(mealData["dietary[]"]) ? mealData["dietary[]"] : [mealData["dietary[]"]];
      delete mealData["dietary[]"];
    }
    const meal = await ProviderManagementService.updateMeal(userId, mealId, mealData);
    res.status(200).json({
      success: true,
      data: meal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const mealId = req.params.id;
    const userId = req.user?.id;
    await ProviderManagementService.deleteMeal(userId, mealId);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!req.body.status) {
      res.status(400).json({
        success: false,
        message: "Status is required"
      });
      return;
    }
    const { status } = req.body;
    const order = await ProviderManagementService.updateOrderStatus(orderId, status);
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getProviderOrders2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orders = await ProviderManagementService.getProviderOrders(userId);
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orderId = req.params.id;
    const order = await ProviderManagementService.getOrderById(userId, orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getProviderMeals2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const meals = await ProviderManagementService.getProviderMeals(userId);
    res.status(200).json({
      success: true,
      data: meals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const profile = await ProviderManagementService.getProfile(userId);
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    let profileData = { ...req.body };
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "grababite/providers");
      profileData.logo = uploadResult.url;
    }
    const profile = await ProviderManagementService.updateProfile(userId, profileData);
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var ProviderManagementController = {
  addMeal: addMeal2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2,
  updateOrderStatus: updateOrderStatus2,
  getProviderOrders: getProviderOrders2,
  getOrderById: getOrderById2,
  getProviderMeals: getProviderMeals2,
  getProfile: getProfile2,
  updateProfile: updateProfile2
};

// src/middlewares/authmiddle.ts
var authMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verify your email!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var authmiddle_default = authMiddleware;

// src/middlewares/upload.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

// src/modules/providerManagement/providerManagement.routes.ts
var router = Router();
router.post("/meals", authmiddle_default("PROVIDER" /* PROVIDER */), upload.single("image"), ProviderManagementController.addMeal);
router.put("/meals/:id", authmiddle_default("PROVIDER" /* PROVIDER */), upload.single("image"), ProviderManagementController.updateMeal);
router.delete("/meals/:id", authmiddle_default("PROVIDER" /* PROVIDER */), ProviderManagementController.deleteMeal);
router.get("/meals", authmiddle_default("PROVIDER" /* PROVIDER */), ProviderManagementController.getProviderMeals);
router.get("/orders", authmiddle_default("PROVIDER" /* PROVIDER */), ProviderManagementController.getProviderOrders);
router.get("/orders/:id", authmiddle_default("PROVIDER" /* PROVIDER */), ProviderManagementController.getOrderById);
router.patch("/orders/:id", authmiddle_default("PROVIDER" /* PROVIDER */), ProviderManagementController.updateOrderStatus);
router.get("/profile", authmiddle_default("PROVIDER" /* PROVIDER */), ProviderManagementController.getProfile);
router.put("/profile", authmiddle_default("PROVIDER" /* PROVIDER */), upload.single("logo"), ProviderManagementController.updateProfile);
var ProviderManagementRoutes = router;

// src/modules/admin/admin.routes.ts
import { Router as Router2 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return await prisma.user.findMany();
};
var getAllCategories = async (userId) => {
  return await prisma.category.findMany();
};
var updateUserStatus = async (userId, status) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status }
  });
};
var getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          meal: {
            include: {
              provider: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var makeProvider = async (providerData) => {
  return await prisma.$transaction(async (tx) => {
    const profile = await tx.providerProfile.create({
      data: providerData
    });
    await tx.user.update({
      where: { id: providerData.userId },
      data: { role: "PROVIDER" }
    });
    return profile;
  });
};
var addCategory = async (categoryData) => {
  return await prisma.category.create({
    data: categoryData
  });
};
var updateCategory = async (categoryId, categoryData) => {
  return await prisma.category.update({
    where: { id: categoryId },
    data: categoryData
  });
};
var deleteCategory = async (categoryId) => {
  return await prisma.category.delete({
    where: { id: categoryId }
  });
};
var AdminService = {
  getAllUsers,
  updateUserStatus,
  makeProvider,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  getAllCategories
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const users = await AdminService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.body.status) {
      res.status(400).json({
        success: false,
        message: "Status is required"
      });
      return;
    }
    const { status } = req.body;
    const user = await AdminService.updateUserStatus(userId, status);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var addCategory2 = async (req, res) => {
  try {
    let categoryData = req.body;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "foodhub/categories");
      categoryData.image = uploadResult.url;
    }
    const category = await AdminService.addCategory(categoryData);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
      return;
    }
    const categories = await AdminService.getAllCategories(userId);
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const categoryId = req.params.id;
    let categoryData = req.body;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "foodhub/categories");
      categoryData.image = uploadResult.url;
    }
    const category = await AdminService.updateCategory(categoryId, categoryData);
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await AdminService.deleteCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    let message = error.message;
    if (error.code === "P2003") {
      message = "Cannot delete category because it has associated items (meals). Please delete or move those items first.";
    }
    res.status(500).json({
      success: false,
      message
    });
  }
};
var makeProvider2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
      return;
    }
    const customerId = req.params.customerId;
    const customerData = {
      userId: customerId,
      ...req.body
    };
    const provider = await AdminService.makeProvider(customerData);
    res.status(201).json({
      success: true,
      data: provider
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const orders = await AdminService.getAllOrders();
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var AdminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  makeProvider: makeProvider2,
  addCategory: addCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2,
  getAllOrders: getAllOrders2,
  getAllCategories: getAllCategories2
};

// src/modules/admin/admin.routes.ts
var router2 = Router2();
router2.get("/users", authmiddle_default("ADMIN" /* ADMIN */), AdminController.getAllUsers);
router2.patch("/users/:id", authmiddle_default("ADMIN" /* ADMIN */), AdminController.updateUserStatus);
router2.post("/make-provider/:customerId", authmiddle_default("ADMIN" /* ADMIN */), AdminController.makeProvider);
router2.get("/categories", authmiddle_default("ADMIN" /* ADMIN */), AdminController.getAllCategories);
router2.post("/categories", authmiddle_default("ADMIN" /* ADMIN */), upload.single("image"), AdminController.addCategory);
router2.put("/categories/:id", authmiddle_default("ADMIN" /* ADMIN */), upload.single("image"), AdminController.updateCategory);
router2.delete("/categories/:id", authmiddle_default("ADMIN" /* ADMIN */), AdminController.deleteCategory);
router2.get("/orders", authmiddle_default("ADMIN" /* ADMIN */), AdminController.getAllOrders);
var AdminRoutes = router2;

// src/modules/public/publicMeal&Provider.routes.ts
import { Router as Router3 } from "express";

// src/modules/public/publicMeal&Provider.service.ts
var getAllMeals = async (filters) => {
  const { category, dietary, minPrice, maxPrice, search, page, limit } = filters;
  const where = {
    isAvailable: true
  };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } }
    ];
  }
  if (category) {
    where.category = {
      name: {
        contains: category,
        mode: "insensitive"
      }
    };
  }
  if (dietary) {
    where.dietary = {
      has: dietary
    };
  }
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }
  const pageNumber = page ? parseInt(page) : 1;
  const limitNumber = limit ? parseInt(limit) : 100;
  const skip = (pageNumber - 1) * limitNumber;
  const [data, total] = await Promise.all([
    prisma.meal.findMany({
      where,
      include: {
        provider: true,
        category: true
      },
      skip,
      take: limitNumber
    }),
    prisma.meal.count({ where })
  ]);
  const totalPages = Math.ceil(total / limitNumber);
  return {
    data,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages
    }
  };
};
var getMealById = async (id) => {
  return await prisma.meal.findUnique({
    where: { id },
    include: {
      provider: true,
      category: true,
      reviews: true
    }
  });
};
var getAllProviders = async () => {
  return await prisma.providerProfile.findMany({
    where: { isApproved: true }
  });
};
var getProviderById = async (id) => {
  return await prisma.providerProfile.findUnique({
    where: { id },
    include: {
      meals: {
        where: { isAvailable: true },
        include: {
          category: true
        }
      }
    }
  });
};
var getAllCategories3 = async () => {
  return await prisma.category.findMany();
};
var PublicService = {
  getAllMeals,
  getMealById,
  getAllProviders,
  getProviderById,
  getAllCategories: getAllCategories3
};

// src/modules/public/publicMeal&Provider.controller.ts
var getAllMeals2 = async (req, res) => {
  try {
    const filters = req.query;
    const { data, meta } = await PublicService.getAllMeals(filters);
    res.status(200).json({
      success: true,
      data,
      meta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getMealById2 = async (req, res) => {
  try {
    const id = req.params.id;
    const meal = await PublicService.getMealById(id);
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found"
      });
    }
    res.status(200).json({
      success: true,
      data: meal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getAllProviders2 = async (req, res) => {
  try {
    const providers = await PublicService.getAllProviders();
    res.status(200).json({
      success: true,
      data: providers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getProviderById2 = async (req, res) => {
  try {
    const id = req.params.id;
    const provider = await PublicService.getProviderById(id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }
    res.status(200).json({
      success: true,
      data: provider
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getAllCategories4 = async (req, res) => {
  try {
    const categories = await PublicService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var PublicController = {
  getAllMeals: getAllMeals2,
  getMealById: getMealById2,
  getAllProviders: getAllProviders2,
  getProviderById: getProviderById2,
  getAllCategories: getAllCategories4
};

// src/modules/public/publicMeal&Provider.routes.ts
var router3 = Router3();
router3.get("/meals", PublicController.getAllMeals);
router3.get("/meals/:id", PublicController.getMealById);
router3.get("/providers", PublicController.getAllProviders);
router3.get("/providers/:id", PublicController.getProviderById);
router3.get("/categories", PublicController.getAllCategories);
var PublicRoutes = router3;

// src/modules/orders/orders.routes.ts
import { Router as Router4 } from "express";

// src/modules/orders/orders.service.ts
var createOrder = async (userId, orderData) => {
  const { deliveryAddress, deliveryPhone, notes, items } = orderData;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const totalAmount = subtotal + deliveryFee;
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        deliveryAddress,
        deliveryPhone,
        notes: notes ?? null,
        totalAmount,
        status: OrderStatus.PLACED
      }
    });
    const orderItemsData = items.map((item) => ({
      orderId: order.id,
      mealId: item.mealId,
      quantity: item.quantity,
      price: item.price
    }));
    await tx.orderItem.createMany({
      data: orderItemsData
    });
    return await tx.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            meal: true
          }
        }
      }
    });
  });
};
var getUserOrders = async (userId) => {
  return await prisma.order.findMany({
    where: { customerId: userId },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getOrderById3 = async (userId, orderId) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    }
  });
};
var OrdersService = {
  createOrder,
  getUserOrders,
  getOrderById: getOrderById3
};

// src/modules/orders/orders.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const order = await OrdersService.createOrder(userId, req.body);
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getUserOrders2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orders = await OrdersService.getUserOrders(userId);
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getOrderById4 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const id = req.params.id;
    const order = await OrdersService.getOrderById(userId, id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    if (order.customerId !== userId && req.user?.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var OrdersController = {
  createOrder: createOrder2,
  getUserOrders: getUserOrders2,
  getOrderById: getOrderById4
};

// src/modules/orders/orders.routes.ts
var router4 = Router4();
router4.post("/", authmiddle_default("CUSTOMER" /* CUSTOMER */), OrdersController.createOrder);
router4.get("/", authmiddle_default("CUSTOMER" /* CUSTOMER */), OrdersController.getUserOrders);
router4.get("/:id", authmiddle_default("CUSTOMER" /* CUSTOMER */), OrdersController.getOrderById);
var OrderRoutes = router4;

// src/modules/auth/auth.routes.ts
import { Router as Router5 } from "express";

// src/modules/auth/auth.service.ts
var findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};
var updateProfile3 = async (id, updateData) => {
  return await prisma.user.update({
    where: { id },
    data: updateData
  });
};
var AuthService = {
  findById,
  updateProfile: updateProfile3
};

// src/modules/auth/auth.controller.ts
var getUserProfileById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    let userData = await AuthService.findById(userId);
    if (userRole === "PROVIDER") {
      const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId }
      });
      userData = { ...userData, providerProfile };
    }
    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateProfile4 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, phone } = req.body;
    const image = req.file?.path;
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (image) updateData.image = image;
    const updatedUser = await AuthService.updateProfile(userId, updateData);
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var AuthController = {
  getUserProfileById,
  updateProfile: updateProfile4
};

// src/modules/auth/auth.routes.ts
var router5 = Router5();
router5.get("/", authmiddle_default("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), AuthController.getUserProfileById);
router5.put("/", authmiddle_default("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), upload.single("image"), AuthController.updateProfile);
var AuthRoutes = router5;

// src/modules/reviews/reviews.routes.ts
import { Router as Router6 } from "express";

// src/modules/reviews/reviews.service.ts
var createReview = async (userId, reviewData) => {
  return await prisma.review.upsert({
    where: {
      mealId_userId: {
        mealId: reviewData.mealId,
        userId
      }
    },
    update: {
      rating: reviewData.rating,
      comment: reviewData.comment ?? null
    },
    create: {
      userId,
      mealId: reviewData.mealId,
      rating: reviewData.rating,
      comment: reviewData.comment ?? null
    }
  });
};
var getMealReviews = async (mealId) => {
  return await prisma.review.findMany({
    where: { mealId },
    include: {
      // Normally we'd include user name here, but better-auth user might need a join
      // For now, let's keep it simple
    },
    orderBy: { createdAt: "desc" }
  });
};
var ReviewsService = {
  createReview,
  getMealReviews
};

// src/modules/reviews/reviews.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const review = await ReviewsService.createReview(userId, req.body);
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getMealReviews2 = async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const reviews = await ReviewsService.getMealReviews(mealId);
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var ReviewsController = {
  createReview: createReview2,
  getMealReviews: getMealReviews2
};

// src/modules/reviews/reviews.routes.ts
var router6 = Router6();
router6.post("/", authmiddle_default("CUSTOMER" /* CUSTOMER */), ReviewsController.createReview);
router6.get("/:mealId", ReviewsController.getMealReviews);
var ReviewRoutes = router6;

// src/app.ts
var app = express();
app.use(cors({
  origin: config_default.app_url,
  credentials: true
}));
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/public", PublicRoutes);
app.use("/api/provider-management", ProviderManagementRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/auth-user-info", AuthRoutes);
app.get("/", (req, res) => {
  res.send("Hello, From GrabABite Backend");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var PORT = config_default.port;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`GrabABite backend is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
