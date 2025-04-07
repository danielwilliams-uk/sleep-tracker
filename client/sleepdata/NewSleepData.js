import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Icon,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import auth from "../auth/auth-helper";
import { create } from "./api-sleepdata";
import { Link, Redirect } from "react-router-dom";

export default function NewSleepData() {
  const [values, setValues] = useState({
    name: "",
    gender: "",
    date: new Date(),
    duration: "",
    notes: "",
    error: "",
  });
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleDateChange = (date) => {
    setValues({ ...values, date: date });
  };

  const clickSubmit = () => {
    const sleepdata = {
      name: values.name || undefined,
      gender: values.gender || undefined,
      date: values.date || undefined,
      duration: values.duration || undefined,
      notes: values.notes || undefined,
    };
    create(
      {
        t: jwt.token,
      },
      sleepdata
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  if (values.redirect) {
    return <Redirect to={"/"} />;
  }
  return (
    <div>
      <Card
        sx={{
          maxWidth: 600,
          margin: "auto",
          textAlign: "center",
          marginTop: 5,
          paddingBottom: 2,
        }}
      >
        <CardContent>
          <Typography
            type="headline"
            component="h2"
            sx={{ marginTop: 2, color: "primary.main", fontSize: "1em" }}
          >
            Sleep Data Record
          </Typography>
          <br />
          <TextField
            id="name"
            label="Name"
            sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="gender"
            label="Gender"
            sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
            value={values.gender}
            onChange={handleChange("gender")}
            margin="normal"
          />
          <br />
          <TextField
            id="duration"
            label="Duration"
            sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
            value={values.duration}
            onChange={handleChange("duration")}
            margin="normal"
            type="number"
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date"
              sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
              value={values.date}
              onChange={handleDateChange}
              showTodayButton
            />
          </LocalizationProvider>
          <br />
          <br />
          <TextField
            id="filled-multiline-static"
            label="Notes"
            multiline
            onChange={handleChange("notes")}
            sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
            margin="normal"
            defaultValue="Write some notes here"
            variant="filled"
          />
          <br /> <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" sx={{ verticalAlign: "middle" }}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            sx={{ margin: "auto", marginBottom: 2 }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
