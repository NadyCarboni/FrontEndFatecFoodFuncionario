import React, { useEffect, useState } from "react";

import "./style.css";
import api from "../../services/api";
import Adicional from "./Componentes/adicional";
import Header from "./Componentes/header";
import NovoAdicional from "./Componentes/novoAdicional";

export default function Adicionais() {
  const [adicionais, setAdicionais] = useState<any[]>();

  const getAdicionais = async () => {
    const response = await api.get("/Adicional");
    setAdicionais(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getAdicionais();
  }, []);

  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <div className="flex column  pt-3">
            <Header />
          </div>
          <div className="main">
            <NovoAdicional />
          </div>
          <div className="lista ">
            {adicionais?.map((item) => {
              return (
                <Adicional
                  nome={item.nome}
                  preco={item.preco}
                  id={item.id}
                  ativo={item.ativo}
                  idProduto={item.produtoId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
