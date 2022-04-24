import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Categoria from "./Pages/GerenciamentoCategorias/Categoria";
import Home from "./Pages/Home/Home";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categoria />} />
      </Routes>
    </Router>
  );
}
