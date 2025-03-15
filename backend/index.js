import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch(error => console.log('❌ Connection failed', error));

io.on('connection', (socket) => {
    console.log('🟢 User Connected:', socket.id);

    socket.on('call-user', ({ userToCall, signalData, from }) => {
        io.to(userToCall).emit('incoming-call', { signal: signalData, from });
    });

    socket.on('answer-call', ({ signal, to }) => {
        io.to(to).emit('call-accepted', signal);
    });

    socket.on('disconnect', () => {
        console.log('🔴 User Disconnected:', socket.id);
    });
});

app.post('/translate-sign', async (req, res) => {
    try {
        const { signData } = req.body;
        const response = await axios.post('https://api.signall.us/translate', { signData });
        res.json({ translatedText: response.data.translation });
    } catch (error) {
        console.error('❌ Translation Error:', error.message);
        res.status(500).json({ error: 'Translation failed' });
    }
});
