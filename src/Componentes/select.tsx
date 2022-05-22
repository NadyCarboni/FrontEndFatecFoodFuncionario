/* eslint-disable react/require-default-props */
import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";

interface IProps {
  name: string;
  value?: string;
  label: string;
  placeholder?: string;
  options?: any[];
}
export default function SelectInput({
  name,
  label,
  value,
  options,
  placeholder,
}: IProps) {
  const [select, setSelected] = useState([]);
  return (
    <div className="inputDefaultContainer ">
      <label htmlFor={name}>{label}</label>
      {/* <select name={name} className=" my-2 poppins">
        <option className="poppins" disabled selected>
          [selecione]
        </option>
        {options?.map((option) => (
          <option className="poppins">{option}</option>
        ))}
      </select> */}

      <Multiselect
        className="my-2 ml-0 poppins"
        placeholder="[Selecione]"
        isObject={false}
        onRemove={(event) => {
          console.log(event);
          setSelected(event);
        }}
        onSelect={(event) => {
          console.log(event);
          setSelected(event);
        }}
        options={options}
      />
    </div>
  );
}
