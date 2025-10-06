import { Entry } from "../types";
import { assertNever } from "../util";
import { Favorite, LocalHospital, Work } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <Favorite color="error" />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Health rating: {entry.healthCheckRating}</Typography>
          </CardContent>
        </Card>
      );

    case "Hospital":
      return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <LocalHospital color="primary" />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>
              Discharge: {entry.discharge.date} ({entry.discharge.criteria})
            </Typography>
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <Work color="action" /> {entry.employerName}
            </Typography>
            <Typography>{entry.description}</Typography>
            {entry.sickLeave && (
              <Typography>
                Sick leave: {entry.sickLeave.startDate} –{" "}
                {entry.sickLeave.endDate}
              </Typography>
            )}
          </CardContent>
        </Card>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
