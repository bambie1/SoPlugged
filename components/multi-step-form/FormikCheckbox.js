import React, { useState } from "react";

import { useField, useFormikContext } from "formik";
import { useBusinessFormContext } from "@contexts/businessFormContext";

const FormikCheckbox = ({ name, label, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [isChecked, setIsChecked] = useState(field.value);
  const { setFormWasChanged } = useBusinessFormContext();

  const handleChange = (e) => {
    const { checked } = e.target;
    setIsChecked(checked);
    setFieldValue(name, checked);
    setFormWasChanged(true);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
    checked: isChecked,
  };
  const configFormControl = {};

  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
    configFormControl.helperText = meta.error;
  }
  return <input type="checkbox" />;
};

export default FormikCheckbox;
