import React from "react";
import { TextField } from "@mui/material";

const InputUserData = ({
  onChange,
  placeholder,
  helperText,
  initialValue,
  error,
}) => {
  return (
    <>
      <TextField
        value={initialValue}
        error={error}
        onChange={onChange}
        placeholder={placeholder}
        helperText={helperText}
        sx={{
          width: "291px",
          height: "50px",
          color: "#A1BFC6",
          borderRadius: "5px",
          opacity: 1,
          marginBottom: "23px",
          marginRight: "10px",
          fontSize: "19px",
          fontWeight: 400,
          lineHeight: "27px",
        }}
      />
    </>
  );
};

export default InputUserData;
