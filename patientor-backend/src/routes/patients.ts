import  express from "express";
import patientService from "../services/patientServices";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPatients());
});


export default router;