/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Dialog from "../../../Componentes/dialog";
import IconChooser from "../../../Componentes/iconChooser";
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
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [produtos, setProdutos] = useState(itens);
  const getProdutosPorCategoria = async (id: number) => {
    try {
      const response = await api.get(`/Produto/Categoria?id=${id}`);

      setProdutos(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteProduto = async (idDelete: number) => {
    try {
      await api.delete(`/Produto?id=${idDelete}`);

      getProdutosPorCategoria(id);
    } catch (err: any) {
      console.error(err);
    }
  };

  const [icon, setIcon] = useState<string>();

  const [nomeCategoria, setNomeCategoria] = useState(nome);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogVer, setOpenDialogVer] = useState(false);

  const [check, setCheck] = useState(ativo);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const updateCategoria = async (dados: any) => {
    try {
      const newData = {
        nome: dados.nomeCategoria,
        ativo: check,
        restauranteId: JSON.parse(localStorage.getItem("restaurante")!),
        imagem: icon,
        id,
      };

      await api.put(`/Categoria?id=${id}`, newData);

      window.location.reload();
    } catch (err: any) {
      console.error(err);
    }
  };
  const dialogBodyEdit = (
    <div className="novaCategoriaDialogBody" key={id}>
      <form onSubmit={handleSubmit(updateCategoria)}>
        <div className="flex align-itens-center input-box">
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
          <i className={`fa-solid fa-${icon || iconCategoria} fa-2x`} />
          <span className="mx-2">Selecione um ícone. </span>
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
    try {
      const response = await api.delete(`/Categoria?id=${id}`);
      console.log(response);
      setGetCategoria();
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    getProdutosPorCategoria(id);
  }, []);

  const dialogBodyDelete = (
    <div className="delete-dialog">
      <div className="delete-dialog__content">
        <p className="delete-dialog__text">Deseja mesmo deletar Adicional?</p>
        <div className="delete-dialog__buttons-container">
          <button
            type="button"
            className="button-delete-dialog-true"
            onClick={() => {
              deleteCategoria();
            }}
          >
            sim
          </button>
          <button
            type="button"
            className="button-delete-dialog-false"
            onClick={() => {
              setOpenDialogDelete(false);
            }}
          >
            não
          </button>
        </div>
      </div>
    </div>
  );

  const dialogBodyVerCategoria = (
    <div
      className={
        ativo === true ? "verCategoriaBody" : "verCategoriaBody desativado"
      }
    >
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
      {openDialogDelete && (
        <Dialog
          closeDialog={setOpenDialogDelete}
          title=""
          body={dialogBodyDelete}
        />
      )}
      <div
        className={
          ativo === true ? "categoriaItem" : "categoriaItem desativado"
        }
        key={id}
      >
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
