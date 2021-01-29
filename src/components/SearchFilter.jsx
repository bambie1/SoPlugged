import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { categories } from "../ListOfCategories";
import LocationSearch from "./LocationSearch";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSearch } from "../contexts/SearchContext";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import { useForm } from "react-hook-form";
import CategorySearch from "./CategorySearch";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    margin: `${theme.spacing(1)}px auto ${theme.spacing(2)}px`,
    width: "100%",
    maxWidth: "700px",
  },
}));

const SearchFilter = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    setContextCategory,
    contextLocation,
    contextCategory,
    setContextLocation,
  } = useSearch();
  const { register, handleSubmit, errors } = useForm();

  const handleSearch = (data) => {
    setContextCategory(data.searchCategory);
    setContextLocation(data.location);
    history.push(`/search`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleSearch)} className={classes.form}>
        <Grid
          container
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} sm={5} className={classes.searchField}>
            <CategorySearch
              label="Search for service"
              variant="filled"
              name="searchCategory"
              ref={register}
              margin="dense"
              error={!!errors.searchCategory}
              helperText={!!errors.searchCategory && "Please select a category"}
              defaultCategory={contextCategory}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12} sm={5} className={classes.searchField}>
            <LocationSearch
              label="Location"
              variant="filled"
              margin="dense"
              name="location"
              ref={register}
              error={!!errors.businessLocation}
              helperText={
                !!errors.businessLocation &&
                "Please enter a location for your services"
              }
              defaultLocation={contextLocation}
            />
          </Grid>
          <Grid item xs={12} sm={2} style={{ margin: "8px 0px" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ margin: "0px 8px", width: "calc(100% - 16px" }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default SearchFilter;
