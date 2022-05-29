import React, { useEffect, useState } from "react";

import "./style.css";
import BtnVoltar from "../../Componentes/btnVoltar";
import api from "../../services/api";
import Adicional from "./Componentes/adicional";
import NovoAdicional from "./Componentes/novoAdicional";

export default function Adicionais() {
  const [adicionais, setAdicionais] = useState<any[]>();
  const [searchNome, setSearchNome] = useState<string>();

  const getAdicionais = async () => {
    try {
      const response = await api.get("/Adicional");
      setAdicionais(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getAdicionaisSearch = async () => {
    try {
      const response = await api.get(`Adicional/Nome?nome=${searchNome}`);
      setAdicionais(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAdicionais();
  }, []);

  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <div className="flex column  pt-3">
            <div className="header-row mb-4">
              <BtnVoltar />
              <div className="flex  ">
                <h2 className="title font-weight-600 ">Gerenciar adicionais</h2>{" "}
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
                      getAdicionaisSearch();
                    }}
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
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
