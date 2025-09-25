import {z} from "zod";
import { Gender } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
export type NewPatient = z.infer<typeof newPatientSchema>;
