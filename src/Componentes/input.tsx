/* eslint-disable react/require-default-props */
import React from "react";

interface IProps {
  name: string;
  value?: string;
  label: string;
}
export default function Input({ name, label, value }: IProps) {
  return (
    <div className="inputDefaultContainer ">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        className="poppins my-2"
        placeholder="Nome da Categoria..."
        value={value}
      />
    </div>
  );
}
