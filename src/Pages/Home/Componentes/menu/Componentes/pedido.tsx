import React, { useEffect, useState } from "react";

import api from "../../../../../services/api";
import ItemSelecionado from "./itemSelecionado";

export default function PedidoComanda({ id, hora }: any) {
  const [itensSelecionados, setItensSelecionados] = useState<any[]>([]);

  const getItemSelecionados = async () => {
    try {
      const response = await api.get("/ItemSelecionado");
      // deixar pra caso vinicius arrume
      // const response = await api.get(`/ItemSelecionado/Pedido?id=${id}`);
      // setItensSelecionados(response.data.data);
      // console.log(response.data);
      response.data.data.forEach((element: any) => {
        if (element.pedidoId === id) {
          setItensSelecionados((itensSelecionados) => [
            ...itensSelecionados,
            element,
          ]);
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getItemSelecionados();
    // console.log(itenSelecionados);
  }, []);

  return (
    <div className="mt-4 pedidoItem p-3">
      <span className="num-pedido">Pedido nº {id}</span>
      <span className="mx-2">{hora}</span>
      <div className="selected">
        {itensSelecionados?.map((element: any) => {
          console.log(element);
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
