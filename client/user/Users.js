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
} from "@mui/material";
import { ArrowForward, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { list } from "./api-user";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Paper
      sx={{
        padding: 1,
        margin: 5,
      }}
      elevation={4}
    >
      <Typography
        variant="h6"
        sx={{ margin: "32px 0 16px", color: "openTitle.main" }}
      >
        All Users
      </Typography>
      <List dense>
        <>
          {users.map((item, i) => (
            <Link to={"/user/" + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
        </>
      </List>
    </Paper>
  );
}
