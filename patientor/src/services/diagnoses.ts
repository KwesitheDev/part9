import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import axios from "axios";

//fetch Diagnosis
export const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return data;
};