import { element } from "prop-types";
import React, { useEffect, useState } from "react";

import api from "../../services/api";
import Header from "./Componentes/header";
import Pedido from "./Componentes/pedido";

export default function FilaPedidos() {
  const [pedidos, setPedidos] = useState<any>();
  const getPedidos = async () => {
    const response = await api.get("/Pedido");
    console.log(response.data.data);
    setPedidos(response.data.data);
  };

  useEffect(() => {
    getPedidos();
  }, []);
  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <div className="flex column  pt-3">
            <Header />
          </div>
          <div className="listaPedidos">
            {pedidos?.map((element: any) => {
              return (
                <Pedido
                  comanda={element.comandaId}
                  data={element.data}
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
