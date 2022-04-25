import React, { useState } from "react";

import Dialog from "../../../Componentes/dialog";
import IconChooser from "../../../Componentes/iconChooser";
import Input from "../../../Componentes/input";
import SaveBtn from "../../../Componentes/saveBtn";

export default function CategoriaItem() {
  const categoria = [
    {
      icon: `fa-solid fa-burger `,
      nome: "Lanches",
      itens: 23,
    },
  ];
  const [icon, setIcon] = useState("fa-circle-plus");
  const [added, setAdded] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogVer, setOpenDialogVer] = useState(false);
  const dialogBodyEdit = (
    <div className="novaCategoriaDialogBody">
      <div className="flex align-itens-center input-box">
        <Input name="nomeCategoria" label="Nome:" value="Doces" />
      </div>
      <div className="iconBox my-3 flex align-itens-center">
        <i className={`fa-solid ${icon}  fa-2x`} />
        {added ? (
          <span className="mx-2">Ícone adicionado! </span>
        ) : (
          <span className="mx-2">+ Adicionar ícone</span>
        )}

        {/* <IconPicker value={value} onChange={(v) => setValue(v)} /> 
        <i className={`fa-solid ${item} fa-2x`}> */}
      </div>{" "}
      <div className="chooser">
        <IconChooser />
      </div>
      <span className="total">23 produtos adicionados nessa categoria.</span>
      <div className="save">
        <SaveBtn />
      </div>
    </div>
  );
  return (
    <div>
      {openDialog && (
        <Dialog
          closeDialog={setOpenDialog}
          title="Editar Categoria"
          body={dialogBodyEdit}
        />
      )}
      {openDialogVer && (
        <Dialog
          closeDialog={setOpenDialogVer}
          title="Ver Categoria"
          body="Ver Categoria"
        />
      )}
      <div className="categoriaItem">
        <div className="detail">
          <div className="iconBox m-3">
            <i className={`${categoria[0].icon} fa-2x`} />
          </div>
          <div className="itens">
            <div className="nomeCategoria titleGrad1 poppins small mb-3">
              {categoria[0].nome}
            </div>
            {categoria[0].itens} itens
            <button
              type="button"
              className="titleGrad1 ver m-1 poppins small"
              onClick={() => {
                setOpenDialogVer(true);
                console.log("123");
              }}
            >
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
