import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/error.js";
import cors from "cors";

// Cross-Origin Resource Sharing (CORS) is an HTTP-header-based protocol that enables a server to dictate which origins can access its resources. Put another way, your server can specify which websites can tell a user's browser to talk to your server, and precisely which types of HTTP requests are allowed.

export const app = express();

if (process.env.NODE_ENV !== 'Production') {
  dotenv.config({
    path: 'backend/config/config.env'
  })
}


//using middlewares 

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT' ,'DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))


//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

app.get("/",(req,res)=>{
    res.send("Nicely Working");
})

// using error middleware 
app.use(errorMiddleware);