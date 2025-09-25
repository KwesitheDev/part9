import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseStringField = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return field;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid data');
  }

  const obj = object as { [key: string]: unknown };

  return {
    name: parseStringField(obj.name, 'name'),
    dateOfBirth: parseStringField(obj.dateOfBirth, 'dateOfBirth'),
    ssn: parseStringField(obj.ssn, 'ssn'),
    gender: parseGender(obj.gender),
    occupation: parseStringField(obj.occupation, 'occupation')
  };
};