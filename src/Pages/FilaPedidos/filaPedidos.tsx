import React, { useEffect } from "react";

import api from "../../services/api";

export default function FilaPedidos() {
  const getPedidos = async () => {
    const response = await api.get("/Pedido");
    console.log(response.data.data);
  };

  useEffect(() => {
    getPedidos();
  }, []);
  return <div>filaPedidos</div>;
}
