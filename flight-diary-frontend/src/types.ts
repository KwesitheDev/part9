export interface DiaryEntry {
    id: string;
    date: string;
    weather: string;
    visibility: string;
    comment?: string;
};

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';