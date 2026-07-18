// import path from 'path';
import dotenv from "dotenv"; 
import express from 'express';
import airoutes from "./airoutes.js"
const app = express();
import cors from "cors"
dotenv.config();

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});