import  express from "express";
import patientService from "../services/patientServices";
//import { NewPatient } from "../types";
import { newPatientSchema } from "../utils";
import { z } from "zod";
import toNewEntry from "../utils/toNewEntry";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatientById(id);
    
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({
      error: 'Patient not found'
    });
  }
});

router.post('/', (req, res, next) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    if(error instanceof z.ZodError) {
      res.status(400).send(error.issues);
    } else {
      next(error);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;