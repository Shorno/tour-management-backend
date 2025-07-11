import app from "./app";
import {disconnectFromMongoDB} from "./config/mongoose";
import {env} from "./config/env";


async function bootstrap() {
    try {
        if (!process.env.VERCEL) {
            app.listen(env.PORT, () => {
                console.log(`🚀 Server running on http://localhost:${env.PORT}`)
                console.log(`📱 Environment: ${env.NODE_ENV}`)
                console.log(`🔗 Local URL: http://localhost:${env.PORT}`)
                console.log(`📚 API Documentation: http://localhost:${env.PORT}/api`)
            })

            // Graceful shutdown
            process.on("SIGTERM", async () => {
                console.log("SIGTERM received, shutting down gracefully")
                await disconnectFromMongoDB()
                process.exit(0)
            })

            process.on("SIGINT", () => {
                console.log("SIGINT received, shutting down gracefully")
                process.exit(0)
            })
        }

        return app
    } catch (error) {
        console.error("❌ Failed to start server:", error)
        process.exit(1)
    }
}

if (require.main === module) {
    bootstrap()
}

export default bootstrap