import React, { useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
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
  form: {
    justifyContent: "center",
    "& .MuiFormControl-root": {
      width: "100%",
      margin: `${theme.spacing(1)}px auto`,
    },
  },
  root: {
    maxWidth: 700,
    margin: `${theme.spacing(2)}px auto`,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  google: {
    border: "2px solid #4285f4",
    display: "flex",
    alignSelf: "center",
    color: "#4285f4",
    width: "calc(100% - 32px)",
    fontWeight: "bold",
  },
  signInLink: {
    color: "#4e3505",
    textDecoration: "underline",
  },
  wrongEmail: {
    textAlign: "center",
    cursor: "pointer",
    color: "#ff5722",
    margin: theme.spacing(1),
  },
}));

const SignInPage = ({ register }) => {
  const classes = useStyles();
  const [mail, setMail] = useState("");
  const { sendLink, currentUser, setCurrentUser } = useAuth();
  const [mailSent, setMailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLink(mail);
    setMailSent(true);
  };

  const handleGoogleSubmit = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return currentUser ? (
    <Redirect to="my-business" />
  ) : (
    <>
      <Header home={false} />
      <div className={classes.page}>
        <Container maxWidth="sm">
          <Paper className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Typography variant="h5">
                {register ? "Register my business" : "Sign In"}
              </Typography>
              <Typography variant="body1">
                Please enter the e-mail{" "}
                {register ? "you'd like to use for" : "associated with"} your
                SoPlugged account.
              </Typography>{" "}
              <br></br>
              <Typography variant="body2">
                We'll send you a{" "}
                <span style={{ textDecoration: "underline" }}>one-time</span>{" "}
                {register ? "verification" : "sign-in"} link.
              </Typography>
              <TextField
                name="userMail"
                label="E-mail"
                variant="outlined"
                type="email"
                disabled={mailSent}
                helperText="P.S: Your potential customers will contact you via this e-mail"
                required
                onChange={(e) => setMail(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                style={{ width: "100%" }}
                disabled={mailSent}
              >
                Send link
              </Button>
              {mailSent && (
                <>
                  <Alert severity="info">
                    We've sent a sign-in link to this e-mail address. <br></br>
                    If you don't get an e-mail, please double-check the e-mail
                    you've entered and check your spam folder.
                  </Alert>
                  <Typography
                    variant="body2"
                    className={classes.wrongEmail}
                    onClick={() => setMailSent(false)}
                  >
                    Wrong e-mail?
                  </Typography>
                </>
              )}
            </form>
            <div className="hr-div">
              <span className="hr-text">OR</span>
            </div>
            <Button
              className={classes.google}
              onClick={() => {
                handleGoogleSubmit();
              }}
            >
              <img
                src="https://img.icons8.com/plasticine/30/000000/google-logo.png"
                alt="google"
              />
              <span style={{ marginLeft: "16px" }}>Continue with Google</span>
            </Button>
          </Paper>
          <div style={{ textAlign: "center" }}>
            <Typography variant="body2">
              {register
                ? "Already have your business on SoPlugged?"
                : "First time on SoPlugged?"}
            </Typography>

            {register ? (
              <Typography variant="body1">
                <Link to="/sign-in" className={classes.signInLink}>
                  Sign in
                </Link>{" "}
                to your business page
              </Typography>
            ) : (
              <Typography variant="body1">
                <Link to="/join" className={classes.signInLink}>
                  Set up
                </Link>{" "}
                your business page
              </Typography>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignInPage;
