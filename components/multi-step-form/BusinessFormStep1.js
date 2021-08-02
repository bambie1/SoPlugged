import React from "react";
import FormikCheckbox from "./FormikCheckbox";
import FormikTextField from "./FormikTextField";

const BusinessFormStep1 = () => {
  return (
    <>
      <FormikTextField name="businessName" label="Name of Business" required />

      <FormikTextField
        name="streetAddress"
        label="Street Address"
        helperText="Optional"
      />
      <FormikCheckbox
        name="canadaWide"
        legend="Geo Restriction"
        label="I provide services Canada-wide"
      />
    </>
  );
};

export default BusinessFormStep1;
