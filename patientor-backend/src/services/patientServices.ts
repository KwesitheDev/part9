import patients from '../data/patients';
import { PublicInfo, NewPatient, Patient } from '../types'; 
import { v1 as uuid } from 'uuid';
import { Entry, NewEntry } from '../types';

//add Entry
const addEntry = (patientId: string, newEntry: NewEntry): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return undefined;

    const entry: Entry = {
        id: uuid(),
        ...newEntry,
    } as Entry;

  patient.entries.push(entry);
  return entry;
};

const getPatients = (): PublicInfo[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
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
    getPatients, addPatient, getPatientById, addEntry
};