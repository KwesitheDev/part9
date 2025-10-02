import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h5">
        {patient.name}{" "}
        {patient.gender === "male" && <MaleIcon />}
        {patient.gender === "female" && <FemaleIcon />}
      </Typography>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>

      <Typography variant="h5">entries</Typography>

<ul>
  {patient.entries.map(entry=> (
    <li key={entry.id}>
      <p><strong>{entry.date}</strong> — {entry.description}</p>

      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map(code => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
    </li>
  ))}
</ul>

    </div>
  );
};

export default PatientPage;
