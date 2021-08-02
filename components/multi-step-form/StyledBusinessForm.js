import Image from "next/image";
import React, { useState } from "react";
import FormStepButton from "./FormStepButton";
import MultiStepBusinessForm from "./MultiStepBusinessForm";
import { useBusinessFormContext } from "@contexts/businessFormContext";
import BusinessTermsConditions from "./BusinessTermsConditions";
import { useRouter } from "next/router";

const StyledBusinessForm = ({ myBusiness, token }) => {
  const router = useRouter();
  const { formSteps, currentStep, setCurrentStep, formWasChanged } =
    useBusinessFormContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [slug, setSlug] = useState(myBusiness?.slug || "");
  const [unsavedAlertOpen, setUnsavedAlertOpen] = useState(false);
  const theme = useTheme();
  const [termsAccepted, setTermsAccepted] = useState(!!myBusiness);

  const handleClose = () => {
    setUnsavedAlertOpen(false);
  };

  const handleStepClick = async (step) => {
    setCurrentStep(step.number);
    setDialogOpen(true);
  };

  // check for value change before leaving page
  const handlePageExit = () => {
    if (formWasChanged) {
      setUnsavedAlertOpen(true);
    } else router.push(`/business/${slug}`);
  };

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <Image src="/images/office_icon.svg" width={70} height={70} />
              {myBusiness?.business_name ? (
                <>
                  <h4>
                    Welcome back,{" "}
                    {myBusiness.creator?.full_name?.split(" ")[0] || "Boss"}
                  </h4>
                  <p>Update your business info as you wish</p>
                </>
              ) : (
                <h4>
                  Hi Boss,
                  <br></br> Let's set up your<br></br> business page
                </h4>
              )}

              <div>
                {formSteps.map((step) => (
                  <FormStepButton
                    stepInfo={step}
                    key={step.number}
                    handleClick={() => handleStepClick(step)}
                    active={currentStep == step.number}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div>
              <MultiStepBusinessForm token={token} />
            </div>
          </div>
        </div>
        <button
          disabled={!myBusiness}
          onClick={handlePageExit}
          style={{ alignSelf: "center" }}
        >
          Go to business page
        </button>
      </div>
      {!termsAccepted && (
        <BusinessTermsConditions handleAgree={() => setTermsAccepted(true)} />
      )}
    </>
  );
};

export default StyledBusinessForm;
