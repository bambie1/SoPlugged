import React from "react";
import { useBusinessFormContext } from "@contexts/businessFormContext";

const FormStepButton = ({ stepInfo, handleClick, active }) => {
  const { completedSteps, unlockedSteps, formWasChanged } =
    useBusinessFormContext();
  let unlocked = unlockedSteps.includes(stepInfo.number);
  let complete = completedSteps.includes(stepInfo.number);
  let inactive = formWasChanged && !active;

  return (
    <div
      key={stepInfo.title}
      onClick={unlocked && !inactive ? handleClick : null}
    >
      <div className="iconDiv">
        <span className="stepNumber">{stepInfo.number + 1}</span>
      </div>

      <div color="inherit" raised={active}>
        <h6>{stepInfo.title}</h6>
        <p>{stepInfo.text}</p>
      </div>
    </div>
  );
};

export default FormStepButton;
