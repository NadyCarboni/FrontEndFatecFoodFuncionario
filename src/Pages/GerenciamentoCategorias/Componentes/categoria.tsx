import React, { useState } from "react";

import Dialog from "../../../Componentes/dialog";

export default function CategoriaItem() {
  const categoria = [
    {
      icon: `fa-solid fa-burger `,
      nome: "Lanches",
      itens: 23,
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      {openDialog && (
        <Dialog
          closeDialog={setOpenDialog}
          title="Editar Categoria"
          body="Editar Categoria"
        />
      )}
      <div className="categoriaItem">
        <div className="detail">
          <div className="icon">
            <i className={`${categoria[0].icon} fa-2x`} />
          </div>
          <div className="itens">
            <div className="nomeCategoria titleGrad1 poppins small mb-3">
              {categoria[0].nome}
            </div>
            {categoria[0].itens} itens
            <button type="button" className="titleGrad1 ver m-1 poppins small">
              VER
            </button>
          </div>
          <div className="edit">
            <button
              type="button"
              style={{ background: "none" }}
              onClick={() => {
                setOpenDialog(true);
                console.log("123");
              }}
            >
              <i className="fa-solid fa-pen " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
