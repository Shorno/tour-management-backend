import express, {Application, Request, Response} from "express";
import {connectToMongoDB} from "./config/mongoose";
import {env} from "./config/env";

const app : Application = express()



app.use(async (req, res, next) => {
    try {
        await connectToMongoDB()
        next()
    } catch (error:any) {
        console.error("Database connection error:", error)
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
        })
    }
})

app.get("/health", (req: Request, res: Response) => {
    const response = {
        success: true,
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



app.get(["/", "/api"], (req: Request, res: Response) => {
    const baseUrl = req.protocol + "://" + req.get("host")

    const response = {
        success: true,
        message: "Express TypeScript API with Modular Architecture",
        timestamp: new Date().toISOString(),
        data: {
            version: "1.0.0",
            environment: process.env.NODE_ENV || "development",
            baseUrl,
            endpoints: {
                health: `${baseUrl}/health`,
                users: {
                    getAll: `GET ${baseUrl}/api/users`,
                    getById: `GET ${baseUrl}/api/users/:id`,
                    create: `POST ${baseUrl}/api/users`,
                    update: `PUT ${baseUrl}/api/users/:id`,
                    delete: `DELETE ${baseUrl}/api/users/:id`,
                    stats: `GET ${baseUrl}/api/users/stats`,
                    bulk: `POST ${baseUrl}/api/users/bulk`,
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

export default app;