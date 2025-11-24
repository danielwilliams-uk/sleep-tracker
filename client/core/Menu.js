import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Home as HomeIcon, Add as AddIcon } from "@mui/icons-material";
import auth from "./../auth/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

const isActive = (location, path) => {
  if (location.pathname === path) {
    return { color: "#ff4081", paddingTop: 5 };
  } else {
    return { color: "#ffffff", paddingTop: 5 };
  }
};

const isButtonActive = (location, path) => {
  if (location.pathname.includes(path))
    return { color: "#fffde7", backgroundColor: "#2bbd7e", marginRight: 10 };
  else
    return {
      color: "#2bbd7e",
      backgroundColor: "#ffffff",
      border: "1px solid #2bbd7e",
      marginRight: 10,
    };
};

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(location, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" color="inherit">
          Sleep Tracker
        </Typography>

        <div style={{ marginLeft: 20 }}>
          <span>
            {auth.isAuthenticated() && (
              <span>
                <Link to="/sleepdata/new">
                  <Button style={isButtonActive(location, "/sleepdata/new")}>
                    <AddIcon style={{ marginRight: 4 }} /> Add Sleep Data
                  </Button>
                </Link>
              </span>
            )}
          </span>
        </div>
        <div style={{ position: "absolute", right: 10 }}>
          <span style={{ float: "right" }}>
            {!auth.isAuthenticated() && (
              <span>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button style={isActive(location, "/signup")}>Sign up</Button>
                </Link>
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button style={isActive(location, "/signin")}>Log in</Button>
                </Link>
              </span>
            )}
          </span>
        </div>
        {auth.isAuthenticated() && (
          <div style={{ position: "absolute", right: 10 }}>
            <span>
              <Link to="/sleepdata/all">
                <Button
                  style={{
                    ...isActive(location, "/sleepdata/all"),
                    paddingTop: 12,
                    verticalAlign: "middle",
                  }}
                >
                  View Sleep Data
                </Button>
              </Link>

              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={{
                    ...isActive(
                      location,
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
                  auth.clearJWT(() => navigate("/"));
                }}
              >
                Sign out
              </Button>
            </span>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
