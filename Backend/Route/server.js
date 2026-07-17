// import path from 'path';
import { configDotenv } from 'dotenv'; // Loads local .env during development
import express from 'express';
import airoutes from "./airoutes.js"
const app = express();
import cors from "cors"
configDotenv({});

// Configure CORS to allow your deployed React app's URL
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173' 
}));

app.use(express.json());

// Bind to process.env.PORT so the hosting provider can set it dynamically
const PORT = process.env.PORT || 3000;


app.use('/api/ai', airoutes);


app.get('/ping', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is up and running!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});