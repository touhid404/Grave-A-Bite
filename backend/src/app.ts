import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { ProviderManagementRoutes } from "./modules/providerManagement/providerManagement.routes";
import { AdminRoutes } from "./modules/admin/admin.routes";
import { PublicRoutes } from "./modules/public/publicMeal&Provider.routes";
import { OrderRoutes } from "./modules/orders/orders.routes";
import { AuthRoutes } from "./modules/auth/auth.routes";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}))

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

// Module Routes
app.use("/api/public", PublicRoutes);
app.use("/api/provider-management", ProviderManagementRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/auth-user-info", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, From FoodHub Backend");
});
app.use(notFound)
app.use(errorHandler)

export default app;