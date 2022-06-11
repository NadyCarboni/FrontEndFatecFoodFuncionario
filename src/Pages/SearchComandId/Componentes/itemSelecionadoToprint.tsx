import React, { useState, useEffect } from "react";

import api from "../../../services/api";
import AdicionalToPrint from "./AdicionalToPrint";

export default function ItemSelecionadoToprint({
  id,
  observacoes,
  produtoId,
  quantidade,
  adicionais,
}: any) {
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<any[]>();
  const getAdicional = async () => {
    try {
      const response = await api.get(
        `/AdicionalSelecionado/ItemSelecionado?id=${id}`
      );
      console.log(response.data.data);
      if (response.data.data) {
        console.log(response.data.data);
        setAdicionaisSelecionados(response.data.data);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

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
    getAdicional();
  }, []);
  return (
    <>
      <li className="poppins mt-3">
        <b className="poppins">Produto: </b>
        {produto?.nome}
      </li>

      <li className="poppins">
        <b className="poppins">Quantidade: </b>
        {quantidade}
      </li>
      <li className="poppins">
        <b className="poppins">Adicionais: </b>
        {adicionaisSelecionados?.map((adicional: any) => {
          console.log(adicional);
          return <AdicionalToPrint adicionalId={adicional.adicionalId} />;
        })}
      </li>
    </>
  );
}
