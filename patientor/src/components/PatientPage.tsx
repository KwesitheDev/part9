/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient, Entry, /*HealthCheckRating*/ } from "../types";
import { apiBaseUrl } from "../constants";
import { Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useStateValue } from "../state"; 
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [{ diagnoses }] = useStateValue();

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [type, setType] = useState("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [employerName, setEmployerName] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

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

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const entryData: any = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
      };

      if (type === "HealthCheck") {
        entryData.healthCheckRating = healthCheckRating;
      } else if (type === "Hospital") {
        entryData.discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
      } else if (type === "OccupationalHealthcare") {
        entryData.employerName = employerName;
      }

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entryData
      );

      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry),
      });

      // reset form
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setHealthCheckRating(0);
      setEmployerName("");
      setDischargeDate("");
      setDischargeCriteria("");
      setError(null);
    } catch (e: any) {
      console.error(e.response?.data || e);
      setError(e.response?.data || "Error adding entry");
    }
  };

  return (
    <div>
      <Typography variant="h5">
        {patient.name}{" "}
        {patient.gender === "male" && <MaleIcon />}
        {patient.gender === "female" && <FemaleIcon />}
      </Typography>

      {patient.ssn && <p>SSN: {patient.ssn}</p>}
      <p>Occupation: {patient.occupation}</p>
      {patient.dateOfBirth && <p>Date of birth: {patient.dateOfBirth}</p>}

      <Typography variant="h6">Add New Entry</Typography>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleAddEntry} style={{ marginBottom: "2em" }}>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <TextField
            label="Health Check Rating"
            type="number"
            inputProps={{ min: 0, max: 3 }}
            fullWidth
            margin="normal"
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          />
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              margin="normal"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <TextField
            label="Employer Name"
            fullWidth
            margin="normal"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
          >
            {Object.values(diagnoses).map((diag) => (
              <MenuItem key={diag.code} value={diag.code}>
                {diag.code} — {diag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Add Entry
        </Button>
      </form>

      <Typography variant="h5">Entries</Typography>
      {patient.entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <div>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} — {diagnoses[code]?.name ?? "Unknown diagnosis"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPage;
