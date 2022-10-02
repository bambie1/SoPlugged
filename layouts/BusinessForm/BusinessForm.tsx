import { FC } from "react";

import { useBusinessFormContext } from "@/context/businessFormContext";

import styles from "./BusinessForm.module.scss";

interface Props {
  current?: number;
  skeleton?: boolean;
}

const BusinessForm: FC<Props> = ({ children, skeleton }) => {
  const { currentStep, formSteps, agreementSigned } = useBusinessFormContext();

  const step = formSteps[currentStep];

  const renderSteps = () => {
    return (
      !skeleton && (
        <aside className="flex items-center">
          <ul className="flex flex-1 flex-col gap-4">
            {formSteps.map((step: any) => (
              <li
                key={step.title}
                className={`${
                  step.number === currentStep && agreementSigned
                    ? "font-bold"
                    : "text-gray-600"
                } transition duration-150 lg:text-lg`}
              >
                {step.title}
              </li>
            ))}
            <li></li>
          </ul>
        </aside>
      )
    );
  };

  const renderStepInfo = () => {
    if (skeleton) return null;

    return (
      <>
        <h1 className="mx-auto mt-12 max-w-lg text-center text-4xl font-bold text-primary lg:text-5xl">
          {agreementSigned ? step.title : "Welcome aboard!"}
        </h1>
        <h2 className="mb-10 mt-4 text-center text-lg lg:text-xl">
          {agreementSigned
            ? step.description
            : "Please confirm the following to get started"}
        </h2>
      </>
    );
  };

  return (
    <>
      {/* mobile view */}
      <div className={styles.mobileWrapper}>
        <div className="bg-gradient-to-b from-secondary to-accent px-4 pt-24 pb-10">
          {renderStepInfo()}
        </div>
        <div className={styles.mobileContent}>{children}</div>
      </div>

      {/* tablet+ view */}
      <div className="absolute left-0 -z-[1] hidden min-h-screen w-[30%] bg-gradient-to-b from-secondary to-accent md:block"></div>
      <section className="my-container hidden min-h-screen grid-cols-3 pt-24 md:grid">
        {renderSteps()}
        <div className="relative col-span-2 col-start-2 mx-auto flex w-full justify-center">
          <div className="flex w-full flex-col">
            {renderStepInfo()}
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessForm;
