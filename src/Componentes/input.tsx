/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface IProps {
  name: string;
  value?: string;
  label: string;
  placeholder?: string;
  register?: any;
  errors?: any;
}
export default function Input({
  name,
  label,
  value,
  placeholder,
  register,
  errors,
  ...props
}: IProps) {
  const { control } = useForm();

  return (
    <div className="inputDefaultContainer ">
      <label htmlFor={name}>{label}</label>

      <input
        type="text"
        className="poppins my-2"
        style={{ fontFamily: "Poppins" }}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </div>
  );
}
