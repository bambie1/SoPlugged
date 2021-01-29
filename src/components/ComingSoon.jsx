import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "#e4e4e4",
    marginTop: "8px",
    textAlign: "center",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "330px",
    "& > * ": {
      margin: "8px",
    },
  },
}));

const ComingSoon = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        Coming Soon ...
      </Typography>
      <Typography variant="h6" style={{ fontWeight: "normal" }}>
        Recently added businesses will be listed here
      </Typography>
      <br></br>
      <Typography variant="h6" style={{ fontWeight: "normal" }}>
        Want to add your business?
      </Typography>
      <Link to="/join">
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "center" }}
        >
          REGISTER
        </Button>
      </Link>
    </div>
  );
};

export default ComingSoon;
