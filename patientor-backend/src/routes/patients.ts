import  express from "express";
import patientService from "../services/patientServices";
//import { NewPatient } from "../types";
import { newPatientSchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPatients());
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


export default router;