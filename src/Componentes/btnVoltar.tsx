import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function BtnVoltar() {
  const navigate = useNavigate();
  return (
    <button
      className="flex column align-itens-center p-2 voltar "
      onClick={() => navigate("/")}
      type="button"
    >
      <BsArrowReturnLeft />
      <p className="small poppins">Voltar</p>
    </button>
  );
}
