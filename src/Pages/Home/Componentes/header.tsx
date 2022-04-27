import React from "react";

import BtnVoltar from "../../../Componentes/btnVoltar";

export default function Header() {
  return (
    <div className="flex column header pt-3">
      <div className="flex first-row">
        <BtnVoltar />
        <div className="flex welcome justify-content-center pt-5">
          <h2>Seja bem-vindo.</h2>
        </div>
      </div>
      <div className="second-row flex justify-content-center align-itens-center">
        <div className="photo">
          <img
            src="data:image/png;base64,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"
            alt="Logo"
          />
        </div>
        <div className="name font-weight-500 mx-2">Subway</div>
        <div className="id small ">id: 2222</div>
      </div>
    </div>
  );
}
