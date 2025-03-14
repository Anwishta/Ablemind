import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log('🚀 Server is running on port', PORT);
        });
    })
    .catch((error) => {
        console.log('❌ Connection failed', error);
    });

app.post('/translate-sign', async (req, res) => {
    try {
        const { signData } = req.body;

        const response = await axios.post('https://api.signall.us/translate', {
            signData,
        });

        res.json({ translatedText: response.data.translation });
    } catch (error) {
        console.error('❌ Translation Error:', error.message);
        res.status(500).json({ error: 'Translation failed' });
    }
});
