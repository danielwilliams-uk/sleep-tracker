import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Home as HomeIcon, Add as AddIcon } from "@mui/icons-material";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff4081", paddingTop: 5 };
  } else {
    return { color: "#ffffff", paddingTop: 5 };
  }
};

const isButtonActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: "#fffde7", backgroundColor: "#2bbd7e", marginRight: 10 };
  else
    return {
      color: "#2bbd7e",
      backgroundColor: "#ffffff",
      border: "1px solid #2bbd7e",
      marginRight: 10,
    };
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
                <Button style={isActive(history, "/signup")}>Sign up</Button>
              </Link>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button style={isActive(history, "/signin")}>Log in</Button>
              </Link>
            </span>
          )}
        </span>
      </div>
      {auth.isAuthenticated() && (
        <div style={{ position: "absolute", right: 10 }}>
          <span>
            <Link to="/sleepdata/new">
              <Button style={isButtonActive(history, "/sleepdata/new")}>
                <AddIcon style={{ marginRight: 4 }} /> Add Sleep Data
              </Button>
            </Link>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button
                style={{
                  ...isActive(
                    history,
                    "/user/" + auth.isAuthenticated().user._id
                  ),
                  paddingTop: 12,
                  verticalAlign: "middle",
                }}
              >
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              style={{ paddingTop: 12, verticalAlign: "middle" }}
              onClick={() => {
                auth.clearJWT(() => history.push("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        </div>
      )}
    </Toolbar>
  </AppBar>
));

export default Menu;
