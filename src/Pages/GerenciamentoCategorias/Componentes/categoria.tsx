/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Dialog from "../../../Componentes/dialog";
import IconChooser from "../../../Componentes/iconChooser";
import Input from "../../../Componentes/input";
import InputSearch from "../../../Componentes/inputSearch";
import SaveBtn from "../../../Componentes/saveBtn";
import api from "../../../services/api";

interface ICategoriaItem {
  iconCategoria: string;
  nome: string;
  id: number;
  ativo: boolean;
  itens: [];
  setGetCategoria: any;
}

export default function CategoriaItem({
  iconCategoria,
  nome,
  id,
  ativo,
  setGetCategoria,
  itens,
}: ICategoriaItem) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [produtos, setProdutos] = useState(itens);
  const getProdutosPorCategoria = async (id: number) => {
    const response = await api.get(`/Produto/Categoria?id=${id}`);

    setProdutos(response.data.data);
  };

  const deleteProduto = async (idDelete: number) => {
    const response = await api.delete(`/Produto?id=${idDelete}`);

    getProdutosPorCategoria(id);
  };

  const [icon, setIcon] = useState("fa-circle-plus");
  const [added, setAdded] = useState(true);
  const [nomeCategoria, setNomeCategoria] = useState(nome);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogVer, setOpenDialogVer] = useState(false);
  const [ativoClass, setAtivoClass] = useState("");
  const [check, setCheck] = useState(ativo);
  const updateCategoria = async (dados: any) => {
    const newData = {
      nome: dados.nomeCategoria,
      ativo: check,
      restauranteId: JSON.parse(localStorage.getItem("restaurante")!),
      imagem: icon,
      id,
    };
    console.log(newData);
    const response = await api.put(`/Categoria?id=${id}`, newData);
    setOpenDialog(false);
    window.location.reload();
    console.log(response);
  };
  const dialogBodyEdit = (
    <div className="novaCategoriaDialogBody" key={id}>
      <form onSubmit={handleSubmit(updateCategoria)}>
        <div className="flex align-itens-center input-box">
          {/* <Input
          name="nomeCategoria"
          label="Nome:"
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.value)}
        /> */}
          <div className="inputDefaultContainer ">
            <label htmlFor="nomeCategoria">Nome:</label>

            <input
              type="text"
              {...register("nomeCategoria", { required: true, maxLength: 80 })}
              className={
                errors.nomeCategoria ? `poppins my-2 invalid` : `poppins my-2 `
              }
              style={{ fontFamily: "Poppins" }}
              defaultValue={nome}
              name="nomeCategoria"
              onChange={(e) => setNomeCategoria(e.target.value)}
            />
          </div>
        </div>
        <div className="iconBox my-3 flex align-itens-center">
          <i className={`fa-solid fa-${icon}  fa-2x`} />
          {added ? (
            <span className="mx-2">Ícone adicionado! </span>
          ) : (
            <span className="mx-2">+ Adicionar ícone</span>
          )}

          {/* <IconPicker value={value} onChange={(v) => setValue(v)} /> 
        <i className={`fa-solid ${item} fa-2x`}> */}
        </div>
        <div className="chooser">
          <IconChooser changeIcon={setIcon} />
        </div>
        <span className="total">
          {produtos.length} produtos adicionados nessa categoria.
        </span>
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

  const deleteCategoria = async () => {
    const response = await api.delete(`/Categoria?id=${id}`);
    console.log(response);
    setGetCategoria();
  };
  useEffect(() => {
    getProdutosPorCategoria(id);
  }, []);

  const dialogBodyVerCategoria = (
    <div className="verCategoriaBody">
      <div className="verHeader">
        <div className="flex">
          <div className="nomeCategoriaVer titleGrad2 poppins ">{nome}</div>
          <button
            type="button"
            className=" poppins deleteComandaCategoria  mx-2"
            onClick={() => deleteCategoria()}
          >
            Deletar
          </button>
        </div>
        <div className="input-box">
          <InputSearch />
        </div>
      </div>
      {produtos.map((item: any) => {
        return (
          <div className="categoriaItemVer" key={item.id}>
            <div className="detailVer">
              <div className="fotoProduto">
                <img src={`http://54.175.22.87${item.foto}`} alt="" />
              </div>
              <div className="info">
                <p>{item.nome}</p>
                <p>R$: {item.preco}</p>
                <p className="my-1">Código {item.id}</p>
                <button
                  type="button"
                  className="titleGrad2  poppins small ver"
                  onClick={() => {
                    setOpenDialogVer(true);
                  }}
                >
                  Mais detalhes
                </button>
              </div>
              <button
                className="delete"
                type="button"
                onClick={() => {
                  deleteProduto(item.id);
                }}
              >
                <i className="fa-solid fa-xmark fa-2x" />
              </button>
            </div>
          </div>
        );
      })}
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
          title=""
          body={dialogBodyVerCategoria}
        />
      )}
      <div className="categoriaItem" key={id}>
        <div className="detail">
          <div className="iconBox m-3">
            <i className={`fa-solid fa-${iconCategoria} fa-2x`} />
          </div>
          <div className="itens flex align-itens-center">
            <div className="nomeCategoria titleGrad1 poppins small ">
              {nome}
            </div>
            <span className="m-2">{produtos.length} Itens</span>
            <button
              type="button"
              className="titleGrad1 ver m-1 poppins small"
              onClick={() => {
                setOpenDialogVer(true);
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
