import express from 'express';
import pingRouter from './routes/ping';
import diagnosesRouter from './routes/diagnosis';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

//ping route
app.use('/api/ping', pingRouter);

//routes
app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});