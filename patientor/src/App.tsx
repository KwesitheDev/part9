import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnoses } from "./state";
import { Patient, Diagnosis } from "./types";

import diagnosesService from "./services/diagnoses";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchData = async () => {
      try {
        const patients: Patient[] = await patientService.getAll();

        const diagnoses: Diagnosis[] = await diagnosesService.getAll();

        dispatch(setPatientList(patients));
        dispatch(setDiagnoses(diagnoses));
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };

    void fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>

          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>

          <Divider hidden />

          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
