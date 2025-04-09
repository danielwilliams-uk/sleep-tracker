import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  TextField,
  Button,
  Icon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import auth from "../auth/auth-helper";
import { listByUser } from "./api-sleepdata";
import { Redirect } from "react-router-dom";
import theme from "../theme";

export default function SleepData() {
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [sleepData, setSleepData] = useState([]);
  const jwt = auth.isAuthenticated();
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByUser(
      { firstDay: firstDay, lastDay: lastDay },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setSleepData(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [firstDay, lastDay]);

  const handleSearchFieldChange = (name) => (date) => {
    if (name === "firstDay") {
      setFirstDay(date);
    } else {
      setLastDay(date);
    }
  };

  const searchClicked = () => {
    listByUser({ firstDay: firstDay, lastDay: lastDay }, { t: jwt.token }).then(
      (data) => {
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          setSleepData(data);
        }
      }
    );
  };

  const handleChange = (name, index) => (event) => {
    const updatedSleepData = [...sleepData];
    updatedSleepData[index][name] = event.target.value;
    setSleepData(updatedSleepData);
  };

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "800px",
        margin: "auto",
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label="SHOWING RECORDS FROM"
            value={firstDay}
            onChange={handleSearchFieldChange("firstDay")}
            renderInput={(params) => (
              <TextField {...params} sx={{ marginRight: 2, width: 240 }} />
            )}
          />
          <DatePicker
            label="TO"
            value={lastDay}
            onChange={handleSearchFieldChange("lastDay")}
            renderInput={(params) => (
              <TextField {...params} sx={{ marginRight: 2, width: 240 }} />
            )}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" onClick={searchClicked}>
          GO
        </Button>
      </div>

      {sleepData.map((data, index) => (
        <Accordion
          key={index}
          sx={{ margin: 1, border: `1px solid ${theme.palette.primary.main}` }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ marginRight: 32 }}>
              <Typography
                sx={{ fontSize: "1.5em", color: theme.palette.primary.main }}
              >
                {data.duration} hrs
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Typography>{data.gender}</Typography>
              <Typography
                sx={{ fontSize: "1.1em", color: theme.palette.text.secondary }}
              >
                {new Date(data.date).toLocaleDateString()}
              </Typography>
            </div>
            <div>
              <Typography sx={{ fontSize: "1.2em" }}>{data.notes}</Typography>
            </div>
          </AccordionSummary>
          <Divider />
          <AccordionDetails sx={{ display: "block" }}>
            <TextField
              label="Duration (hrs)"
              value={data.duration}
              onChange={handleChange("duration", index)}
              sx={{ margin: 1, width: 240 }}
              type="number"
            />
            <TextField
              label="Gender"
              value={data.gender}
              onChange={handleChange("gender", index)}
              sx={{ margin: 1, width: 240 }}
            />
            <TextField
              label="Notes"
              multiline
              rows={2}
              value={data.notes}
              onChange={handleChange("notes", index)}
              sx={{ margin: 1, width: 240 }}
            />
            <div style={{ textAlign: "right" }}>
              {error && (
                <Typography component="p" color="error">
                  <Icon color="error" sx={{ verticalAlign: "middle" }}>
                    error
                  </Icon>
                  {error}
                </Typography>
              )}
              {saved && (
                <Typography
                  component="span"
                  color="secondary"
                  sx={{ marginRight: 2 }}
                >
                  Saved
                </Typography>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
