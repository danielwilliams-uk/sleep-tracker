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
import auth from "./../auth/auth-helper";
import { signin } from "./api-auth";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export default function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
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
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="body1" component="p">
            Log in below to track your sleep patterns.
          </Typography>
        </CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clickSubmit();
          }}
        >
          <TextField
            id="email"
            type="email"
            label="Email"
            sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            sx={{ marginLeft: 1, marginRight: 1, width: 300 }}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
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
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{ margin: "auto", marginBottom: 2 }}
            >
              Log In
            </Button>
          </CardActions>
        </form>
      </CardContent>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Card>
  );
}
