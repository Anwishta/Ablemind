import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:5173'
// }))

const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.listen(PORT , ()=>{
        console.log('Server is running on port ', PORT);
        
    })
})
.catch((error)=>{
    console.log('Connection failed',error);
})

app.use(express.json());
