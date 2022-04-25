import React, { useState } from "react";
import { IconPicker } from "react-fa-icon-picker";

import Dialog from "../../../Componentes/dialog";
import IconChooser from "../../../Componentes/iconChooser";
import Input from "../../../Componentes/input";
import SaveBtn from "../../../Componentes/saveBtn";

export default function NovaCategoria() {
  const [icon, setIcon] = useState("fa-circle-plus");
  const [added, setAdded] = useState(false);
  const [value, setValue] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const dialogBody = (
    <div className="novaCategoriaDialogBody">
      <div className="flex align-itens-center input-box">
        <Input name="nomeCategoria" label="Nome:" />
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
      <div className="save">
        <SaveBtn />
      </div>
    </div>
  );
  return (
    <>
      {openDialog && (
        <Dialog
          closeDialog={setOpenDialog}
          title="Nova Categoria"
          body={dialogBody}
        />
      )}
      <div className="novaCategoriaContainer">
        <div className="novaCategoriaItem">
          <button
            style={{ background: "none" }}
            className="categoriaItem novaCategoria"
            type="button"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <div className="novaDetail">
              <div className="adiconarButton">Nova Categoria</div>
              <div className="adicionarTexto poppins">+Adicionar Categoria</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
