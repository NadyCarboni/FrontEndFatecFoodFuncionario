import React, { useState } from "react";

import api from "../../../../../services/api";
import PedidoComanda from "./pedido";

export default function Comanda({ id, pedido }: any) {
  const deleteComanda = async (comandaId: number) => {
    try {
      await api.delete(`/Comanda?id=${comandaId}`);
    } catch (err: any) {
      console.error(err);
    }
  };
  const getDate = (data: any) => {
    const dataFormatada = new Date(data).toLocaleDateString();
    const horaFormatada = new Date(data).toLocaleTimeString();
    return `${dataFormatada} - ${horaFormatada}`;
  };

  const [pedidosOpen, setPedidosOpen] = useState(false);
  return (
    <div className="comandaItem m-3">
      <span className="numComanda ">Comanda: {id}</span>
      {!pedidosOpen ? (
        <button
          type="button"
          onClick={() => setPedidosOpen(true)}
          className="ver titleGrad1 poppins small verPedidos "
        >
          Ver pedidos
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setPedidosOpen(false)}
          className="ver titleGrad1 poppins small verPedidos "
        >
          Fechar exibir pedidos
        </button>
      )}
      <button
        type="button"
        onClick={() => deleteComanda(id)}
        className="ver titleGrad1 poppins small deleteComandaCategoria mx-2"
      >
        Fechar comanda
      </button>
      {pedidosOpen &&
        pedido.map((pedido: any) => (
          <PedidoComanda id={pedido.id} hora={getDate(pedido.data)} />
        ))}
    </div>
  );
}
