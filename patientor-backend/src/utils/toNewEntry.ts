import { NewEntry, Diagnosis, HealthCheckRating } from '../types';

const parseString = (value: unknown, name: string): string => {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid or missing ${name}`);
  }
  return value;
};

const parseDate = (value: unknown): string => {
  if (!value || typeof value !== 'string' || isNaN(Date.parse(value))) {
    throw new Error('Invalid or missing date');
  }
  return value;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [];
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Missing or invalid entry type');
  }

  const baseEntry = {
    description: parseString((object as unknown as { description: unknown }).description, 'description'),
    date: parseDate((object as unknown as { date: unknown }).date),
    specialist: parseString((object as unknown as { specialist: unknown }).specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch ((object as { type: string }).type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in object)) {
        throw new Error('Missing healthCheckRating');
      }
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: (object as { healthCheckRating: HealthCheckRating }).healthCheckRating,
      } as NewEntry;

    case 'Hospital':
      if (!('discharge' in object)) {
        throw new Error('Missing discharge');
      }
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: (object as { discharge: { date: string; criteria: string } }).discharge,
      }as NewEntry;

    case 'OccupationalHealthcare':
      if (!('employerName' in object)) {
        throw new Error('Missing employerName');
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString((object as { employerName: unknown }).employerName, 'employerName'),
        sickLeave: (object as { sickLeave?: { startDate: string; endDate: string } }).sickLeave,
      }as NewEntry;

    default:
      throw new Error(`Unknown entry type: ${(object as { type: string }).type}`);
  }
};

export default toNewEntry;
