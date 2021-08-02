import React from "react";
import { useField } from "formik";

const FormikTextField = ({ name, handleChange, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return <input placeholder="formik text field" />;
};

export default FormikTextField;
