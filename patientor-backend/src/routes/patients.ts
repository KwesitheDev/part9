import  express from "express";
import patientService from "../services/patientServices";
import { NewPatient } from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPatients());
});

router.post('/',(_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient: NewPatient = _req.body;
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
});


export default router;