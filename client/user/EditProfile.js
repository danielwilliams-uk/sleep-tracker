import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import { Redirect } from "react-router-dom";
import auth from "./../auth/auth-helper";
import { read, update } from "./api-user";

export default function EditProfile({ match }) {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues(data);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    update({ userId: match.params.userId }, { t: jwt.token }, user).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, userId: data._id, redirectToProfile: true });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // If no error after fetch() call, render redirect to updated Profile page
  if (values.redirectToProfile) {
    return <Redirect to={"/user/" + values.userId} />;
  }

  return (
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
          variant="h6"
          sx={{ margin: 2, color: "protectedTitle.main" }}
        >
          Edit Profile
        </Typography>
        <TextField
          id="name"
          type="name"
          label="Name"
          sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
          onChange={handleChange("name")}
          margin="normal "
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
          onChange={handleChange("email")}
          margin="normal "
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
          onChange={handleChange("password")}
          margin="normal "
        />
        <br />
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
  );
}
