import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/userRouter.js";
import galleryItemRouter from "./routes/galleryItemRouter.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import categoryRouter from "./routes/categoryRouter.js";
dotenv.config();

const app=express();


const connectionString=process.env.MONGO_URL;

app.use(bodyParser.json());
app.use((req,res,next)=>{

    const token=req.header("Authorization")?.replace("Bearer ","");
    if (token) {
        jwt.verify(token,process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = decoded;
             next();
            });
        }else{
                next();
            }
            });
    
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to the database");
    }
).catch(
    (err)=>
    {
        console.log("Connection failed",err.message);
    }
)
app.use("/api/users", userRouter);
app.use("/api/gallery",galleryItemRouter);
app.use("/api/category",categoryRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000");
})