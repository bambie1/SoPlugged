import React from "react";
import Skeleton from "./Skeleton";
import { Grid } from "@material-ui/core";

const BusinessGridSkeleton = ({ number }) => {
  return (
    <Grid container spacing={1}>
      {[...Array(number).keys()].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Skeleton type="box" />
        </Grid>
      ))}
    </Grid>
  );
};

export default BusinessGridSkeleton;
