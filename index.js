import express from "express";
import route from "./routes/route.js";
import cors from "cors";
import connectDB from "./db/connect.js";

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();
app.use("/api",route);
const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})