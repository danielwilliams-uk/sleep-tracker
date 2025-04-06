import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import cat from "./../assets/images/cat-sleeping.jpg";
import CardMedia from "@material-ui/core/CardMedia";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
// import SleepDataverview from "../sleepdata/SleepDataOverview";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    // backgroundColor: theme.palette.primary.dark,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      {/* {auth.isAuthenticated() && <SleepDataOverview />} */}
      {!auth.isAuthenticated() && typeof window !== "undefined" && (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={cat}
            title="Unicorn Bicycle"
          />
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
