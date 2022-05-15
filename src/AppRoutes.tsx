import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FilaPedidos from "./Pages/FilaPedidos/filaPedidos";
import Adicionais from "./Pages/GerenciamentoAdicionais/adicionais";
import Categoria from "./Pages/GerenciamentoCategorias/Categoria";
import Produtos from "./Pages/GerenciamentoProdutos/produtos";
import Home from "./Pages/Home/Home";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categoria />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<FilaPedidos />} />
        <Route path="/adicionais" element={<Adicionais />} />
      </Routes>
    </Router>
  );
}
