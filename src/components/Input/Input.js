import React from "react";
import "./input.scss";
function Input({
  value,
  placeholder,
  type,
  onChange,
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={
        onChange ? (e) => onChange(e) : null
      }
    />
  );
}

export default Input;
