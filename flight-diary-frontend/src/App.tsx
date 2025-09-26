import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import * as diaryService from './diaryService';


function App() {
 const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(setDiaries);
  },[])


  return (<div>
    <h1>Flight Diaries</h1>
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