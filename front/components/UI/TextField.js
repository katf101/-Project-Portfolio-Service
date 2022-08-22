import React from "react";
import { useField, ErrorMessage } from "formik";
import styled from "styled-components";

export const TextField = ({ label, ...props }) => {
  const [filed, meta] = useField(props);
  console.log(filed, meta);
  return (
    <div>
      {/* <label htmlFor={filed.name}>{label}</label> */}
      <input {...filed} {...props} autoComplete="off" />
      <ErrMessage component="div" name={filed.name} />
    </div>
  );
};

const ErrMessage = styled(ErrorMessage)`
  width: 17.55vw;
  color: red;
`;
