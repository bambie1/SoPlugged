import React from "react";
import { useBusinessFormContext } from "@contexts/businessFormContext";
import Image from "next/image";
import { Form, Formik } from "formik";
import validationSchema from "./validationSchema";

const FormikStepper = ({ children, ...props }) => {
  const steps = React.Children.toArray(children);
  const {
    formSteps,
    currentStep,
    setCurrentStep,
    markStepUnlocked,
    setFormWasChanged,
    markStepComplete,
    markStepIncomplete,
    formWasChanged,
  } = useBusinessFormContext();
  const currentChild = steps[currentStep];

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const handleSubmit = async (values, helpers) => {
    if (currentStep === steps.length - 1) {
      await props.onSubmit(values, helpers);

      // reset changed boolean to allow step buttons to be clicked again
      setFormWasChanged(false);
    } else {
      let currentFields = formSteps[currentStep].fieldNames;
      if (currentFields) {
        let allFieldsComplete = true;
        for (let i = 0; i < currentFields.length; i++) {
          if (values[currentFields[i]] == "") {
            allFieldsComplete = false;
          }
        }
        markStepUnlocked(currentStep + 1);
        allFieldsComplete
          ? markStepComplete(currentStep)
          : markStepIncomplete(currentStep);
      }
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <Formik
      {...props}
      validationSchema={validationSchema[currentStep]}
      onSubmit={handleSubmit}
    >
      <Form onChange={(val) => setFormWasChanged(true)}>
        <div>{currentChild}</div>

        <div>
          <button disabled={currentStep === 0} onClick={handleBack}>
            Back
          </button>
          {<p>{`Step ${currentStep + 1} / ${formSteps.length}`}</p>}

          <button
            type="submit"
            disabled={currentStep === steps.length - 1 && !formWasChanged}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

        {formSteps[currentStep].bottomImage && (
          <div>
            <Image
              src={formSteps[currentStep].bottomImage}
              width={400}
              height={400}
              alt="Decorative illustration"
            />
          </div>
        )}
      </Form>
    </Formik>
  );
};

export default FormikStepper;
