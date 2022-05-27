import React, { useEffect, useState } from "react";

import BtnVoltar from "../../Componentes/btnVoltar";
import api from "../../services/api";
import Header from "./Componentes/header";
import ListaProdutos from "./Componentes/listaProdutos";
import NovoProduto from "./Componentes/novoProduto";

export default function Produtos() {
  const [produto, setProduto] = useState<any[]>([]);
  const [searchNome, setSearchNome] = useState<string>();
  const getProduto = async () => {
    const response = await api.get("/Produto");

    setProduto(response.data.data);
  };

  const getProdutoSearch = async () => {
    const response = await api.get(`/Produto/Nome?nome=${searchNome}`);

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
            <div className="header-row mb-4">
              <BtnVoltar />
              <div className="flex  ">
                <h2 className="title font-weight-600 ">Gerenciar Produtos</h2>{" "}
              </div>
              <div className="flex align-itens-center input-box">
                <div className="inputSearchContainer">
                  <input
                    type="text"
                    placeholder="O que está procurando?"
                    className="poppins"
                    onChange={(e) => {
                      setSearchNome(e.target.value);
                    }}
                    value={searchNome}
                  />
                  <button
                    className="submit-lente"
                    type="submit"
                    onClick={() => {
                      getProdutoSearch();
                    }}
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
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
                  porcao={item.porcao}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
