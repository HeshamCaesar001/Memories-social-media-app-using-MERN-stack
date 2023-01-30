import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from 'cors';
import PostRoutes from "./routes/posts.js";
import userRoutes from "./routes/auth.js";
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())
app.use('/posts',PostRoutes);
app.use('/users',userRoutes)

const PORT = process.env.PORT ;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://127.0.0.1:27017/memories',{ useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server open on  http://localhost:${PORT}`)}))
.catch((error)=>console.error(error));


