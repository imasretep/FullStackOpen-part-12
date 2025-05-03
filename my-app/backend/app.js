import express, { json } from 'express';
import cors from 'cors';
import lightsRoutes from './routes/lights.js';

const app = express();
app.use(cors());
app.use(json());

app.use('/', lightsRoutes);

export default app;
