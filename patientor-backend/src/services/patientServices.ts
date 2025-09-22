import patients from '../data/patients';
import { PublicInfo } from '../types'; 

const getPatients = (): PublicInfo[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients
};