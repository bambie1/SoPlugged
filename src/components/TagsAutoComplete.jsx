import React, { useEffect, useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { categories } from "../ListOfCategories";

const useStyles = makeStyles((theme) => ({}));

const TagsAutoComplete = ({ defaultCategory }) => {
  const { contextCategory } = useSearch();
  const classes = useStyles();
  const [catObject, setCatObject] = useState(null);

  useEffect(() => {
    if (contextCategory) {
      setCatObject(categories.find(({ label }) => label === contextCategory));
    } else if (defaultCategory) {
      setCatObject(categories.find(({ label }) => label === defaultCategory));
    } else setCatObject(null);
  }, [contextCategory, defaultCategory]);

  let tagArray = catObject?.tags.split(",") || [];
  // console.log({ tagArray });
  return (
    <Autocomplete
      multiple
      options={tagArray}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Business Tags"
          placeholder="Add tags to help users easily find your business"
          helperText="You can add your tags by hitting 'Enter' after typing"
        />
      )}
    />
  );
};

export default TagsAutoComplete;
