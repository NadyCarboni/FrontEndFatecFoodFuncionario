import React, { useEffect, useState } from "react";

import BtnVoltar from "../../Componentes/btnVoltar";
import api from "../../services/api";
import CategoriaItem from "./Componentes/categoria";
import NovaCategoria from "./Componentes/novaCategoria";
import "./style.css";

// export interface ICategoria {
//   ativo: boolean;
//   foto: string;
//   id: number;
//   nome: string;
//   produtos: [];
//   restauranteId: 3;
// }
export default function Categoria() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [searchNome, setSearchNome] = useState<string>();

  const getCategorias = async () => {
    try {
      const response = await api.get("/Categoria");
      setCategorias(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getCategoriasSearch = async () => {
    try {
      const response = await api.get(`Categoria/Nome?nome=${searchNome}`);
      setCategorias(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);
  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <div className="flex column  pt-3">
            <div className="header-row mb-4">
              <BtnVoltar />
              <div className="flex  ">
                <h2 className="title font-weight-600 ">Gerenciar Categorias</h2>{" "}
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
                      getCategoriasSearch();
                    }}
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="main">
              <NovaCategoria setGetCategoria={getCategorias} />
              {categorias.map((categoria) => {
                return (
                  <CategoriaItem
                    key={categoria.id}
                    id={categoria.id}
                    setGetCategoria={getCategorias}
                    ativo={categoria.ativo}
                    nome={categoria.nome}
                    iconCategoria={categoria.imagem}
                    itens={categoria.produtos}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
