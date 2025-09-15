import express from 'express';
import {calculateExercise} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('./exercises', (req, res) => {
    const { dailyHours, target } = req.body;
     if(!dailyHours || !target) {
        return res.status(400).json({error: 'parameters missing'});
     }
     
    if (!Array.isArray(dailyHours)
        || isNaN(Number(target))
        || dailyHours.some(hour => isNaN(Number(hour)))
    ) {
        return res.status(400).json({error: 'malformatted parameters'});
    }

    const result = calculateExercise(dailyHours.map(d=>Number(d)), Number(target));

    return res.json(result)

    
});

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})