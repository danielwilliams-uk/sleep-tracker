import React from "react";
import { withRouter, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff4081", paddingTop: 12 };
  } else {
    return { color: "#ffffff", paddingTop: 12 };
  }
};

const Menu = withRouter(({ history }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon />
        </IconButton>
      </Link>
      <Typography variant="h6" color="inherit">
        Sleep Tracker
      </Typography>

      <div style={{ position: "absolute", right: 10 }}>
        <span style={{ float: "right" }}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button style={isActive(history, "/signup/")}>Sign up</Button>
              </Link>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button style={isActive(history, "/signin")}>Log in</Button>
              </Link>
            </span>
          )}
        </span>
      </div>

      {auth.isAuthenticated() && (
        <span>
          <Link to="/sleepdata/new">
            <Button style={isButtonActive(history, "/expenses/new")}>
              <AddIcon style={{ marginRight: 4 }} /> Add Sleep Data
            </Button>
          </Link>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button
              style={isActive(
                history,
                "/user/" + auth.isAuthenticated().user._id
              )}
            >
              My Profile
            </Button>
          </Link>
          <Button
            color="inherit"
            style={{ paddingTop: 12 }}
            onClick={() => {
              auth.clearJWT(() => history.push("/"));
            }}
          >
            Sign out
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
));

export default Menu;
