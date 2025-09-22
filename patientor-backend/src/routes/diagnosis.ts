import express from 'express';
import diagnosisService from '../services/diagnosisServices';
const router = express.Router();


router.get('/', (_req, res) => {
    res.json(diagnosisService.getDiagnosis());
});

