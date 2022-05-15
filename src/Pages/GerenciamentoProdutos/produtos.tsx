import React, { useEffect, useState } from "react";

import api from "../../services/api";
import Header from "./Componentes/header";
import ListaProdutos from "./Componentes/listaProdutos";
import NovoProduto from "./Componentes/novoProduto";

export default function Produtos() {
  const [produto, setProduto] = useState<any[]>([]);
  const getProduto = async () => {
    const response = await api.get("/Produto");

    setProduto(response.data.data);
  };

  useEffect(() => {
    getProduto();
  }, []);
  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <div className="flex column  pt-3">
            <Header />
            <div className="main" />
            <NovoProduto setGetProduto={getProduto} />
          </div>
          <div className="listaProdutos">
            {produto.map((item) => {
              return (
                <ListaProdutos
                  id={item.id}
                  img={item.foto}
                  setGetProduto={getProduto}
                  preco={item.preco}
                  adicionais={item.adicionais}
                  key={item.id}
                  ativo={item.ativo}
                  descricao={item.descricao}
                  categoriaId={item.categoriaId}
                  nome={item.nome}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
