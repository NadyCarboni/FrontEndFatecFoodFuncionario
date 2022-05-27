import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FilaPedidos from "./Pages/FilaPedidos/filaPedidos";
import Adicionais from "./Pages/GerenciamentoAdicionais/adicionais";
import Categoria from "./Pages/GerenciamentoCategorias/Categoria";
import Produtos from "./Pages/GerenciamentoProdutos/produtos";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SearchComandId from "./Pages/SearchComandId/SearchComandId";

function Private({ Item }: { Item: any }) {
  const [isSigned, setIsSigned] = useState<boolean>(false);
  useEffect(() => {
    setIsSigned(Boolean(localStorage.getItem("isSigned")));
  }, [isSigned]);
  return isSigned ? <Item /> : <Login />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Private Item={Home} />} />
        <Route path="/categorias" element={<Private Item={Categoria} />} />
        <Route path="/produtos" element={<Private Item={Produtos} />} />
        <Route path="/pedidos" element={<Private Item={FilaPedidos} />} />
        <Route path="/adicionais" element={<Private Item={Adicionais} />} />
        <Route path="/comandaId" element={<Private Item={SearchComandId} />} />
      </Routes>
    </Router>
  );
}
