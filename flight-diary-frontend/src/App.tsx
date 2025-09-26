import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import * as diaryService from './diaryService';
import axios from 'axios';


function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    diaryService.getAll().then(setDiaries);
  }, [])
  
const addDiary = async (event: React.SyntheticEvent) => {
  event.preventDefault();
  try {
    const newDiary = await diaryService.create({ date, visibility, weather, comment });
    setDiaries(diaries.concat(newDiary));
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      alert(`Error: ${e.response.data}`);
    } else {
      alert('Unknown error');
    }
  }
};


  return (<div>
    <h1>Flight Diaries</h1>
    <h2>Add New Entry</h2>
      <form onSubmit={addDiary}>
        <div>Date <input type="text" value={date} onChange={e => setDate(e.target.value)} /></div>
        <div>Visibility <input type="text" value={visibility} onChange={e => setVisibility(e.target.value)} /></div>
        <div>Weather <input type="text" value={weather} onChange={e => setWeather(e.target.value)} /></div>
        <div>Comment <input type="text" value={comment} onChange={e => setComment(e.target.value)} /></div>
        <button type="submit">Add</button>
      </form>

    <h2>Diary Entries</h2>
    {diaries.map(d => (
      <div key={d.id}>
        <h3>{d.date}</h3>
        <p>Visibility: {d.visibility}</p>
        <p>Weather: {d.weather}</p>
        {d.comment && <p><i>{d.comment}</i></p>}
      </div>
    ))}
  </div>
  );

}

export default App;