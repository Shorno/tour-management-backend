import express, {Application} from "express";

const app : Application = express()


app.get("/", (req, res)=>{
    res.status(200).json({
        message : "Welcome to the backend"
    })
})

export default app;