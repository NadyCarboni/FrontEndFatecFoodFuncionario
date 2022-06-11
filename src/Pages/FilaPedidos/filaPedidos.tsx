/* eslint-disable jsx-a11y/label-has-associated-control */
import { element } from "prop-types";
import React, { useEffect, useState } from "react";

import BtnVoltar from "../../Componentes/btnVoltar";
import InputSearch from "../../Componentes/inputSearch";
import api from "../../services/api";
import Header from "./Componentes/header";
import Pedido from "./Componentes/pedido";

export default function FilaPedidos() {
  const [pedidos, setPedidos] = useState<any>();
  const [selecionados, setItensSelecionados] = useState("todos");
  const getPedidos = async () => {
    setPedidos([]);
    try {
      const response = await api.get("/Pedido");

      setPedidos(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };
  const getPedidosEntregues = async () => {
    setPedidos([]);
    try {
      const response = await api.get("/Pedido/Entregue");
      console.log(response.data.data);
      setPedidos(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getPedidosNaoEntregues = async () => {
    setPedidos([]);
    try {
      const response = await api.get("/Pedido/NaoEntregue");
      setPedidos(response.data.data);

      console.log(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(selecionados);
    switch (selecionados) {
      case "todos":
        getPedidos();
        break;

      case "true":
        getPedidosEntregues();
        break;
      case "false":
        getPedidosNaoEntregues();
        break;
      default:
        getPedidos();
        break;
    }
  }, [selecionados]);
  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <div className="flex column  pt-3">
            <div className="header-row mb-4">
              <BtnVoltar />
              <div className="flex  ">
                <h2 className="title font-weight-600 ">Fila de pedidos</h2>{" "}
              </div>
              <div className="flex align-itens-center input-box">
                <div className="inputDefaultContainer ">
                  <select
                    name="EntregueSelect"
                    onChange={(e) => setItensSelecionados(e.target.value)}
                  >
                    <option value="todos" selected>
                      Procurar por pedidos entregues...
                    </option>
                    <option value="true">Entregue</option>
                    <option value="false">Não entregue</option>
                    <option value="todos">Ver todos</option>
                  </select>
                </div>
              </div>
              <div className="inputSearchContainer">
                {/* <input
                    type="text"
                    placeholder="O que está procurando?"
                    className="poppins"
                  /> */}
              </div>
            </div>
          </div>
          <div className="listaPedidos">
            {pedidos?.map((element: any) => {
              // console.log(element);
              return (
                <Pedido
                  entregue={element.entregue}
                  comanda={element.comandaId}
                  data={element.data}
                  total={element.total}
                  id={element.id}
                  itemSelecionado={element.itemSelecionado}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
