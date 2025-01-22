import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI=process.env.URI;
export const connectDB=async()=>{
try {
    await mongoose.connect(URI,{
        useNewUrlParser:true,
    useUnifiedTopology:true
    })
    console.log("Database connected");
} catch (error) {
    console.log("Issue with connection");
}
}
export default connectDB;