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
    <div className="pedido m-3 flex py-4 column">
      <p className="mx-4">
        <span className="numeroPedido poppins small">Pedido {id}</span>
        <span className=" mx-2 titleGrad1 px-2 comanda">
          Comanda: {comanda}
        </span>
        <span>Data: {getDate(data)}</span>
      </p>
      <div className=" itemLista flex m-4">
        <div className="itemTitulo p-2">Itens selecionados:</div>
        <ul>
          {itemSelecionado?.map((element: any) => {
            return (
              <li className="item-selecionados ">
                <ul className="m-2 flex column flex py-2">
                  <li>
                    <span className="titleGrad1 small poppins mx-2 px-1">
                      Observacões:{" "}
                    </span>
                    {element.observacoes}
                  </li>
                  <li>
                    <span className="titleGrad1 small poppins mx-2 px-1">
                      Produto:{" "}
                    </span>
                    {element.produtoId}
                  </li>
                  <li>
                    <span className="titleGrad1 small poppins mx-2 px-1">
                      Quantidade:{" "}
                    </span>
                    {element.quantidade}
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <p>{itemSelecionado}</p> */}
    </div>
  );
}
