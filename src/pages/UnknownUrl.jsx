import React from "react";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";
import { Link, Redirect } from "react-router-dom";
import { auth, provider } from "../firebase/firebase.utils";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: "80vh",
    padding: theme.spacing(8, 1, 2),
  },
  container: {
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const UnknownUrl = () => {
  const classes = useStyles();

  return (
    <>
      <Header home={false} />
      <div className={classes.page}>
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4">Oops!</Typography>
          <Typography variant="h6">
            The url you've reached doesn't exist.
          </Typography>
          <Button variant="contained">
            <Link to="/">Return to Home Page</Link>
          </Button>
        </Container>
      </div>
    </>
  );
};

export default UnknownUrl;
