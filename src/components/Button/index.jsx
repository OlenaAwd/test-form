import React from "react";

import styles from "./Button.module.scss";

const Button = ({ onClick, children, disabled = false }) => {
  const onClickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.button} ${disabled && styles.disabled}`}
      onClick={onClickHandler}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};

export default Button;
