import React, { useEffect, useState } from "react";

import api from "../../../../../services/api";
import Adicional from "./adicional";

export default function ItemSelecionado({
  produtoId,
  quantidade,
  id,
  observacoes,
  adicionais,
}: any) {
  const [produto, setProduto] = useState<any>();

  const getNomeProduto = async () => {
    const response = await api.get(`/Produto/Individual?id=${produtoId}`);

    setProduto(response.data.data[0]);
  };

  useEffect(() => {
    getNomeProduto();
  }, []);

  return (
    <div className="itensSelecionados detailItem my-3 p-3">
      Item:
      <li className="item-selecionados detailItem ">
        <ul className="m-2 flex column flex ">
          <li>
            <span className="titleGrad1 small poppins mx-2 px-1">
              Observacões:{" "}
            </span>
            &quot; {observacoes} &quot;
          </li>
          <li>
            <span className="titleGrad1 small poppins mx-2 px-1">
              Produto:{" "}
            </span>
            {produto?.nome}
          </li>
          <li>
            <span className="titleGrad1 small poppins mx-2 px-1">
              Quantidade:{" "}
            </span>
            {quantidade}
          </li>
          <li>
            <span className="titleGrad1 small poppins mx-2 px-1">
              Adicionais:{" "}
            </span>
            {adicionais?.map((adicional: any) => {
              return <Adicional adicionalId={adicional.adicionalId} />;
            })}
          </li>
        </ul>
      </li>
    </div>
  );
}
