import React, { useEffect, useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

import BtnVoltar from "../../../Componentes/btnVoltar";
import api from "../../../services/api";

export default function Header() {
  const [error, setError] = useState<any>();
  const [restaurant, setRestaurant] = useState<any>();

  const getRestaurante = async () => {
    try {
      const response = await api.get("/Restaurante");
      if (response) setRestaurant(response.data.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getRestaurante();
  }, []);

  console.log("restaurant: ", restaurant);
  return (
    <div className="flex column header pt-3">
      <div className="flex first-row">
        <BtnVoltar />
        <div className="flex welcome justify-content-center pt-5">
          <h2>Seja bem-vindo.</h2>
        </div>
        <button
          className="logout-button"
          type="button"
          onClick={() => {
            localStorage.removeItem("isSigned");
            window.location.reload();
          }}
        >
          <RiLogoutBoxLine className="logout-icon" />
        </button>
      </div>
      <div className="second-row flex justify-content-center align-itens-center">
        <div className="photo">
          <img src={`http://54.175.22.87${restaurant?.[0].foto}`} alt="Logo" />
        </div>
        <div className="name font-weight-500 mx-2">{restaurant?.[0].nome}</div>
        <div className="id small ">{`id: ${restaurant?.[0].id}`}</div>
      </div>
    </div>
  );
}
