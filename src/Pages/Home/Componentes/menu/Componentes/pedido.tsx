import React, { useEffect, useState } from "react";

import api from "../../../../../services/api";
import ItemSelecionado from "./itemSelecionado";

export default function PedidoComanda({ id, hora }: any) {
  const [itensSelecionados, setItensSelecionados] = useState<any>();
  const getItemSelecionados = async () => {
    const response = await api.get(`/ItemSelecionado/Pedido?id=${id}`);

    setItensSelecionados(response.data.data);
    // console.log(response.data.data);
  };
  useEffect(() => {
    getItemSelecionados();
  }, []);

  return (
    <div className="mt-4 pedidoItem p-3">
      <span className="num-pedido">Pedido nº {id}</span>
      <span className="mx-2">{hora}</span>
      <div className="selected">
        {itensSelecionados?.map((element: any) => {
          console.log(element.adicionalSelecionado);
          return (
            <ItemSelecionado
              id={element.id}
              observacoes={element.observacoes}
              produtoId={element.produtoId}
              quantidade={element.quantidade}
              adicionais={element.adicionalSelecionado}
            />
          );
        })}
      </div>
    </div>
  );
}
