import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { forwardRef } from "react";

import styles from "./Input.module.scss";

type Props = {
  label: string;
  error?: string;
  noHelper?: boolean;
  prefix?: string;
} & React.ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, noHelper, prefix, ...props }, ref: any) => {
    const renderHelperText = () => {
      if (error) return <span className={styles.errorMsg}>{error}</span>;

      return <span className={`${styles.helperText} ${styles.hidden}`}>.</span>;
    };

    const tempId = label.split(" ")[0];

    return (
      <div className="relative grid w-full text-left">
        <label
          htmlFor={tempId}
          className={`mb-1 block text-sm font-semibold uppercase ${
            !!error && "text-red-500"
          }`}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative mt-1 grid overflow-hidden rounded-md">
          {prefix && (
            <div className="pointer-events-none absolute top-1 bottom-1 left-1 flex w-full max-w-[5rem] items-center justify-end rounded-lg bg-gray-100 px-2">
              <span className="text-gray-500">{prefix}</span>
            </div>
          )}
          <input
            id={tempId}
            ref={ref}
            {...props}
            className={`rounded-xl border border-primary bg-white p-4 transition duration-150 placeholder:italic placeholder:text-slate-400 ${
              !!error
                ? "border-red-500 focus:outline-2 focus:outline-red-500"
                : "border-primary focus:border-primary focus:ring-primary"
            } ${prefix && "pl-24"}`}
          />
        </div>
        {!!error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 mt-1 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        {!noHelper && renderHelperText()}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
