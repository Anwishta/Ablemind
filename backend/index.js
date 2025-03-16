import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import connectDB from './config/db.js';

// Import Routes
import userRoutes from './routes/userRoutes.js';  
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import resumeRouter from './routes/resumeRoutes.js'; // Added Resume Routes

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

connectDB();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/user', userRoutes); 
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/resume', resumeRouter); 

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

app.post('/generate-drawing', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: "No prompt provided" });

        const response = await openai.images.generate({
            prompt,
            model: 'dall-e-3',
            n: 1
        });

        res.json({ imageUrl: response.data[0].url });

    } catch (error) {
        console.error("❌ AI Drawing Error:", error);
        res.status(500).json({ error: 'Drawing generation failed' });
    }
});
app.post('/generate-resume', async (req, res) => {
    try {
        const { name, education } = req.body;
        console.log("🛠️ Received Data:", req.body); // Debug log

        if (!name || !education) {
            return res.status(400).json({ error: "Missing required fields: name and education" });
        }

        const prompt = `Generate job experience and relevant skills for a person named ${name} with education: ${education}.`;
        console.log("🔍 AI Prompt:", prompt); // Debug log

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-3.5", // ✅ Use gpt-3.5-turbo if gpt-4-turbo is unavailable
            messages: [{ role: "system", content: prompt }],
        });
        
        
        console.log("✅ AI Response:", aiResponse); // Debug log

        if (!aiResponse.choices || aiResponse.choices.length === 0) {
            throw new Error("AI response is empty");
        }

        const generatedText = aiResponse.choices[0].message.content.split("\n\n");

        res.json({
            experience: generatedText[0] || "No experience generated.",
            skills: generatedText[1] || "No skills generated.",
        });

    } catch (error) {
        console.error("❌ AI Resume Generation Error:", error);
        res.status(500).json({ error: error.message || 'AI resume generation failed' });
    }
});
