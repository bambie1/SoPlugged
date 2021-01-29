import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  link: {
    color: theme.palette.primary.main,
  },
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
    textTransform: "uppercase",
  },
}));

const NoBusinessFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">
        No businesses found for this category in this location
      </Typography>
      <br></br>
      <Typography>
        Know of a business that should be on this list?{" "}
        <a href="mailto:hello@soplugged.com" className={classes.link}>
          Let us know
        </a>
      </Typography>

      <hr style={{ width: "70%", maxWidth: "500px" }}></hr>
      <Typography>
        A business owner?{" "}
        <Link to="/join" className={classes.link}>
          Add your business to our platform
        </Link>
      </Typography>
    </div>
  );
};

export default NoBusinessFound;
