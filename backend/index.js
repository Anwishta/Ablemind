import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import resumeRoute from './routes/resumeRoutes.js';

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

connectDB();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/user', userRoutes);
app.use('/api/resume', resumeRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);

app.post("/generate-drawing", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);
    
    console.log("Full AI Response:", response);

    // Modify this according to Gemini's actual image response structure
    const imageUrl = response.text(); 

    if (!imageUrl) {
      return res.status(500).json({ error: "No image URL found in AI response" });
    }

    res.json({ imageUrl });
  } catch (error) {
    console.error("AI Drawing Error:", error);
    res.status(500).json({ error: "Error generating drawing" });
  }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

io.on('connection', (socket) => {
    console.log('🟢 User Connected:', socket.id);

    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });

    socket.on('clear-whiteboard', () => {
        io.emit('clear-whiteboard');
    });

    socket.on('disconnect', () => {
        console.log('🔴 User Disconnected:', socket.id);
    });
});
