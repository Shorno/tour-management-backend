import express, {Application, Request, Response} from "express";
import cors from "cors"
import {isMongoConnected} from "./utils/mongoose";
import {env} from "./utils/env";
import {router} from "./routes";
import {globalErrorHandler} from "./middlewares/globalErrorHandler";
import {notFound} from "./middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get("/health", (req: Request, res: Response) => {
    const dbStatus = isMongoConnected()
    const response = {
        success: true,
        database: dbStatus ? "connected" : "disconnected",
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
        data: {
            uptime: process.uptime(),
            environment: env.NODE_ENV,
            vercel: !!process.env.VERCEL,
            region: process.env.VERCEL_REGION || "local",
        },
    }
    res.status(200).json(response)
})

app.use("/api/v1/", router)


app.get(["/", "/api"], (req: Request, res: Response) => {
    const baseUrl = req.protocol + "://" + req.get("host")

    const response = {
        success: true,
        message: "Express TypeScript API with Modular Architecture",
        timestamp: new Date().toISOString(),
        data: {
            version: "1.0.0",
            environment: env.NODE_ENV,
            baseUrl,
            endpoints: {
                health: `${baseUrl}/health`,
                users: {
                    getAll: `GET ${baseUrl}/api/users`,
                    getById: `GET ${baseUrl}/api/users/:id`,
                    create: `POST ${baseUrl}/api/users`,
                    update: `PUT ${baseUrl}/api/users/:id`,
                    delete: `DELETE ${baseUrl}/api/users/:id`,
                },
                products: {
                    getAll: `GET ${baseUrl}/api/products`,
                    getById: `GET ${baseUrl}/api/products/:id`,
                    create: `POST ${baseUrl}/api/products`,
                    update: `PUT ${baseUrl}/api/products/:id`,
                    delete: `DELETE ${baseUrl}/api/products/:id`,
                    stats: `GET ${baseUrl}/api/products/stats`,
                    updateStock: `PATCH ${baseUrl}/api/products/:id/stock`,
                },
            },
        },
    }
    res.status(200).json(response)
})

app.use(globalErrorHandler)

app.use(notFound)

export default app;