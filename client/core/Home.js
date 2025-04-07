import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
import cat from "./../assets/images/cat-sleeping.jpg";

export default function Home() {
  return (
    <>
      {/* {auth.isAuthenticated() && <SleepDataOverview />} */}
      {!auth.isAuthenticated() && typeof window !== "undefined" && (
        <Card
          sx={{
            maxWidth: 600,
            margin: "auto",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <CardMedia sx={{ minHeight: 400 }} image={cat} title="Cat" />
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="body1" component="p">
              Welcome to Sleep Tracker. <Link to="/signup">Sign up</Link> to
              start your journey to better sleep today or{" "}
              <Link to="/signin">Log In</Link> to track your sleep pattern .
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
