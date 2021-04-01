import React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";
import Head from "next/head";
import {
  Button,
  Typography,
  Container,
  makeStyles,
} from "../components/mui-components";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1, 0),
    },
  },
  paper: {
    padding: theme.spacing(2, 0),
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: "underline",
  },
}));

const Auth = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Quick sign-up process to get started on SoPlugged as a user or business owner"
        />
        <title>Join SoPlugged</title>
      </Head>
      <div className="page" style={{ zIndex: "1", background: "white" }}>
        <Container maxWidth="sm" className={classes.container}>
          <Typography variant="h1">Join SoPlugged</Typography>
          <Typography>
            Please verify your identity via one of the following sign-in
            methods:
          </Typography>
          <div className={classes.paper}>
            <FirebaseAuth />
          </div>
          <br></br>
          <br></br>
          <Typography>
            Already a SoPlugged member?
            <a href="/sign-in" className={classes.link}>
              {" "}
              Sign in here{" "}
            </a>
            .
          </Typography>
          <Link href="/search">
            <a>
              <Button variant="outlined" color="secondary">
                I'm just browsing
              </Button>
            </a>
          </Link>
        </Container>
      </div>
    </>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
