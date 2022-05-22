/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "./style.css";
import api from "../../../services/api";

export default function Pedido({ comanda, data, id, itemSelecionado }: any) {
  const [produtos, setProdutos] = useState<any[]>();

  const getDate = (data: any) => {
    const dataFormatada = new Date(data).toLocaleDateString();
    return dataFormatada;
  };
  const getProdutos = async () => {
    const response = await api.get("/Produto");
    console.log(response.data.data);
    setProdutos(response.data.data);
  };

  return (
    <div className="pedido m-3 flex py-4">
      <p>
        <span>Pedido {id}</span>
        <span className=" mx-2 titleGrad1 px-2 comanda">
          Comanda: {comanda}
        </span>
        <span>Data: {getDate(data)}</span>
      </p>
      {/* <p>{itemSelecionado}</p> */}
    </div>
  );
}
