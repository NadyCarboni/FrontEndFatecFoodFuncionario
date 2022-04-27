import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import CategoriaItem from "./Componentes/categoria";
import Header from "./Componentes/header";
import NovaCategoria from "./Componentes/novaCategoria";
import "./style.css";

export default function Categoria() {
  const navigate = useNavigate();
  const getCategorias = async () => {
    const response = await api.get("/Categoria");
    console.log(response);
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
              <NovaCategoria />
              <CategoriaItem />
              <CategoriaItem />
              <CategoriaItem />
              <CategoriaItem />
              <CategoriaItem />
              <CategoriaItem />
              <CategoriaItem />
              <CategoriaItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
