import patients from '../data/patients';
import { PublicInfo, NewPatient, Patient } from '../types'; 
import { v1 as uuid } from 'uuid';

const getPatients = (): PublicInfo[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return {
        ...newPatient
    };
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

export default {
    getPatients, addPatient, getPatientById
};