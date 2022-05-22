import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import CategoriaItem from "./Componentes/categoria";
import Header from "./Componentes/header";
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

  const navigate = useNavigate();
  const getCategorias = async () => {
    const response = await api.get("/Categoria");
    setCategorias(response.data.data);
  };

  useEffect(() => {
    getCategorias();
  }, []);
  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <div className="flex column  pt-3">
            <Header />
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
