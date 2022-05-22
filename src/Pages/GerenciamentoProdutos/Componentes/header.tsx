import React from "react";

import BtnVoltar from "../../../Componentes/btnVoltar";
import InputSearch from "../../../Componentes/inputSearch";

export default function Header() {
  return (
    <div className="header-row mb-4">
      <BtnVoltar />
      <div className="flex  ">
        <h2 className="title font-weight-600 ">Gerenciar Produtos</h2>{" "}
      </div>
      <div className="flex align-itens-center input-box">
        <InputSearch />
      </div>
    </div>
  );
}
