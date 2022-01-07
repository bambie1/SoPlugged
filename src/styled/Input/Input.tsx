import { forwardRef } from "react";

import styles from "./Input.module.scss";

type Props = {
  label: string;
  error?: string;
  noHelper?: boolean;
} & React.ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, noHelper, required, ...props }, ref: any) => {
    const renderHelperText = () => {
      if (error) return <span className={styles.errorMsg}>{error}</span>;

      return <span className={`${styles.helperText} ${styles.hidden}`}>.</span>;
    };

    const inputID = label.toLowerCase().replace(" ", "-");

    return (
      <div className={styles.formGroup}>
        <label
          id={inputID}
          className={`${styles.label} ${!!error && styles.error}`}
        >
          {label}
        </label>
        <input
          aria-labelledby={inputID}
          ref={ref}
          {...props}
          className={`${styles.input} ${!!error && styles.error}`}
        />
        {!noHelper && renderHelperText()}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
