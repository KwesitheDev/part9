import axios from 'axios';
import type { DiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAll = async (): Promise<DiaryEntry[]> => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
};


