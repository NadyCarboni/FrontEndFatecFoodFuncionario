/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { IconPicker } from "react-fa-icon-picker";
import { useForm } from "react-hook-form";

import Dialog from "../../../Componentes/dialog";
import IconChooser from "../../../Componentes/iconChooser";
import Input from "../../../Componentes/input";
import SaveBtn from "../../../Componentes/saveBtn";
import api from "../../../services/api";

interface IProps {
  setGetCategoria: any;
}
export default function NovaCategoria({ setGetCategoria }: IProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [icon, setIcon] = useState("fa-circle-plus");
  const [added, setAdded] = useState(false);
  const [value, setValue] = useState();

  const [openDialog, setOpenDialog] = useState(false);
  const [check, setCheck] = useState(true);

  const postCategoria = async (dados: any) => {
    const newData = {
      nome: dados.nomeCategoria,
      ativo: check,
      imagem: icon,
      restauranteId: JSON.parse(localStorage.getItem("restaurante")!),
    };
    const response = await api.post("/Categoria", newData);
    setGetCategoria();
    console.log(icon);
  };
  const dialogBody = (
    <div className="novaCategoriaDialogBody">
      <form onSubmit={handleSubmit(postCategoria)}>
        <div className="flex align-itens-center input-box">
          <div className="inputDefaultContainer ">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="nomeCategoria">Nome:</label>
            <input
              type="text"
              {...register("nomeCategoria", { required: true, maxLength: 80 })}
              name="nomeCategoria"
              className={
                errors.nomeCategoria ? `poppins my-2 invalid` : `poppins my-2 `
              }
              style={{ fontFamily: "Poppins" }}
              placeholder="Nome da categoria..."
            />
          </div>
        </div>
        <div className="iconBox my-3 flex align-itens-center">
          <i className={`fa-solid fa-${icon} fa-2x`} />
          {added ? (
            <span className="mx-2">Ícone adicionado! </span>
          ) : (
            <span className="mx-2">+ Adicionar ícone</span>
          )}

          {/* <IconPicker value={value} onChange={(v) => setValue(v)} /> 
        <i className={`fa-solid ${item} fa-2x`}> */}
        </div>{" "}
        <div className="chooser">
          <IconChooser changeIcon={setIcon} />
        </div>
        <div className="flex align-itens-center">
          <label>Ativo:</label>
          <div className="toggle mx-3">
            <label className="switch">
              <input
                type="checkbox"
                checked={check}
                onChange={(e) => {
                  setCheck(e.target.checked);
                }}
              />
              <div className="slider" />
            </label>
          </div>
        </div>
        <div className="save">
          <SaveBtn />
        </div>
      </form>
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
