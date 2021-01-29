import React from "react";
//component needed for react-hook-form child compnents
const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};

export default Form;
