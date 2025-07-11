import {Server} from "http"
import connectDB from "./config/mongodb";
import app from "./app";


let server : Server;


const startServer = async ()=> {
    try {
        await connectDB();
        server = app.listen(5000, () => {
            console.log(`Server is running at http://localhost:5000`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}


startServer()