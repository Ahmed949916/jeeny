import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './index.js';
import rideRoutes from './routes/rideRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/rides', rideRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
