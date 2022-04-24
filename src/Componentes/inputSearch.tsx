import React from "react";

export default function InputSearch() {
  return (
    <div className="inputSearchContainer">
      <input
        type="text"
        placeholder="O que está procurando?"
        className="poppins"
      />
      <button className="submit-lente" type="submit">
        <i className="fa fa-search" />
      </button>
    </div>
  );
}
