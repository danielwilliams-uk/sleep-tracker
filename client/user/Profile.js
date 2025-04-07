import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { Redirect, Link } from "react-router-dom";
import dayjs from "dayjs";
import DeleteUser from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { read } from "./api-user";
import { Edit, Person } from "@mui/icons-material";

export default function Profile({ match }) {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        marginTop: 5,
      }}
      elevation={4}
    >
      <Typography
        variant="h6"
        sx={{ marginTop: 3, color: "protectedTitle.main" }}
      >
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + dayjs(user.created).format("DD/MM/YYYY")}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
