import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BusinessCard from "../components/BusinessCard";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  page: {
    textAlign: "center",
    padding: "80px 8px 0px",
    minHeight: "80vh",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const BusinessPreview = () => {
  const classes = useStyles();
  const { currentBusiness, isNewBusiness } = useAuth();

  return (
    <>
      <Header home={false} />
      <div className={classes.page}>
        <Typography variant="h6">
          {isNewBusiness
            ? "Thanks for registering your business on SoPlugged!"
            : "Your SoPlugged business has been updated"}
        </Typography>
        {!isNewBusiness && (
          <>
            <br></br>
            <Typography>
              We've sent a confirmation e-mail to you as well.
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: "0.8rem" }}
              color="textSecondary"
            >
              Didn't get one? Be sure to check your spam/junk folder
            </Typography>
          </>
        )}
        <br></br>
        <Typography variant="body2">
          Here's a snapshot of your business card:
        </Typography>
        <Link to="/my-business">
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Link>
        <ErrorBoundary>
          <BusinessCard dbObject={currentBusiness} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default BusinessPreview;
