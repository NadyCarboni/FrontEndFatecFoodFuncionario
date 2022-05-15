/* eslint-disable react/require-default-props */
import React from "react";

interface IProps {
  name: string;
  value?: string;
  label: string;
  placeholder?: string;
}
export default function TextArea({ name, label, value, placeholder }: IProps) {
  return (
    <div className="inputDefaultContainer ">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        className="poppins my-2"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
