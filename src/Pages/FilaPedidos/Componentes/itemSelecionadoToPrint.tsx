import React, { useState, useEffect } from "react";

import api from "../../../services/api";
import AdicionalToPrint from "./adicionalToPrint";

export default function ItemSelecionadoToPrint({
  id,
  observacoes,
  produtoId,
  quantidade,
  adicionais,
}: any) {
  const [produto, setProduto] = useState<any>();

  const getNomeProduto = async () => {
    try {
      const response = await api.get(`/Produto/Individual?id=${produtoId}`);
      // console.log(response.data.data[0]);
      setProduto(response.data.data[0]);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNomeProduto();
  }, []);

  return (
    <>
      {" "}
      <li className="poppins mt-3">
        <b className="poppins">Produto: </b>
        {produto?.nome}
      </li>
      <li className="poppins">
        <b className="poppins"> Observacões: </b>&quot; {observacoes} &quot;
      </li>
      <li className="poppins">
        <b className="poppins">Quantidade: </b>
        {quantidade}
      </li>
      <li className="poppins">
        <b className="poppins">Adicionais: </b>
        {adicionais?.map((adicional: any) => {
          return <AdicionalToPrint adicionalId={adicional.adicionalId} />;
        })}
      </li>
    </>
  );
}
