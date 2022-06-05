/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Alert from "../../../Componentes/Alert";
import Dialog from "../../../Componentes/dialog";
import SaveBtn from "../../../Componentes/saveBtn";
import api from "../../../services/api";

export default function Adicional({ nome, preco, id, idProduto, ativo }: any) {
  const [openDialog, setOpenDialog] = useState(false);
  const [check, setCheck] = useState(ativo);
  const [selected, setSelected] = useState();
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState("");
  const [produtos, setProdutos] = useState<any[]>();
  const getProdutos = async () => {
    const response = await api.get("/Produto");
    console.log(response.data.data);
    setProdutos(response.data.data);
  };
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [nomeProduto, setNomeProduto] = useState("");
  const deleteAdicional = async (id: any) => {
    const response = await api.delete(`/Adicional?id=${id}`);
    window.location.reload();

    console.log(response.data);
  };

  const getProdutoIndividual = async () => {
    const response = await api.get(`/Produto/Individual?id=${idProduto}`);

    setNomeProduto(response.data.data[0].nome);
  };
  const updateAdicional = async (data: any) => {
    const newData = {
      nome: data.nomeAdicional,
      preco: parseFloat(data.precoAdicional.toString().replace(",", ".")),
      ativo: check,
      produtoId: data.produtoSelect,
    };
    const response = await api.put(`/Adicional?id=${id}`, newData);
    setOpenDialog(false);
    window.location.reload();
    console.log(response);
  };

  const dialogBody = (
    <div className="novaCategoriaDialogBody">
      <form onSubmit={handleSubmit(updateAdicional)}>
        <div className=" precoNome">
          <div className="input-box">
            {/* <Input
              name="nomeProduto"
              label="Nome:"
              placeholder="Nome do produto..."
            /> */}
            <div className="inputDefaultContainer ">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="nomeAdicional">Nome: </label>
              <input
                type="text"
                {...register("nomeAdicional", {
                  required: true,
                  maxLength: 30,
                })}
                className={
                  errors.nomeAdicional
                    ? `poppins my-2 invalid`
                    : `poppins my-2 `
                }
                name="nomeAdicional"
                style={{ fontFamily: "Poppins" }}
                placeholder="Nome do adicional..."
                defaultValue={nome}
              />
            </div>
          </div>{" "}
          <div className="input-box">
            <div className="inputDefaultContainer ">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="precoAdional">Preço:</label>
              <input
                defaultValue={preco}
                type="text"
                {...register("precoAdicional", {
                  required: "Por favor insira o preço do adicional",

                  pattern: {
                    value: /(\$?(:?\d+,?.?)+)/,
                    message: "Por favor, digite um preço válido",
                  },
                })}
                className={
                  errors.precoAdicional
                    ? `poppins my-2 invalid`
                    : `poppins my-2 `
                }
                style={{ fontFamily: "Poppins" }}
                placeholder="R$ 00,00"
              />
            </div>
          </div>
        </div>
        <div className="input-box">
          {/* <SelectInput
           
            name="categoriaSelect"
            label="Categorias:"
            options={["banana", "maça"]}
          /> */}
          <div className="inputDefaultContainer ">
            <label htmlFor="produtoSelect">Produto: </label>
            <select
              {...register("produtoSelect", {
                required: "Por favor selecione algum produto", // JS only: <p>error message</p> TS only support string
              })}
              defaultValue={idProduto}
              name="produtoSelect"
              className={
                errors.produtoSelect ? `poppins my-2 invalid` : `poppins my-2 `
              }
              onChange={(e: any) => setSelected(e.target.value)}
            >
              <option className="poppins" disabled selected>
                [selecione]
              </option>
              {produtos?.map(
                (produto) =>
                  produto.ativo && (
                    <option
                      className="poppins"
                      value={produto.id}
                      key={produto.id}
                    >
                      {produto.nome}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>

        <div className="flex align-itens-center mt-2">
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

  const dialogBodyDelete = (
    <div className="delete-dialog">
      <div className="delete-dialog__content">
        <p className="delete-dialog__text">Deseja mesmo deletar Adicional?</p>
        <div className="delete-dialog__buttons-container">
          <button
            type="button"
            className="button-delete-dialog-true"
            onClick={() => {
              deleteAdicional(id);
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

  useEffect(() => {
    getProdutos();
    getProdutoIndividual();
    if (errors.nomeAdicional) {
      try {
        switch (errors.nomeAdicional.type) {
          case "required":
            setErroMessage("Por favor, insira um nome para seu adicional");
            break;
          case "maxLength":
            setErroMessage(
              "Por favor, insira um nome para seu adicional com até 30 caracteres "
            );
            break;
          default:
            break;
        }
      } finally {
        setCloseAlert(true);
      }
    } else if (errors.precoAdicional) {
      try {
        switch (errors.precoAdicional.type) {
          case "required":
            setErroMessage("Por favor, insira um preço para seu adicional");
            break;
          case "pattern":
            setErroMessage(
              "Por favor, insira um preço válido para seu adicional"
            );
            break;
          default:
            break;
        }
      } finally {
        setCloseAlert(true);
      }
    }
  }, [errors.nomeAdicional, errors.precoAdicional]);
  return (
    <>
      {" "}
      {closeAlert && (
        <Alert
          message={erroMessage}
          closeAlert={setCloseAlert}
          status="error"
        />
      )}
      {openDialog && (
        <Dialog
          closeDialog={setOpenDialog}
          title="Editar adicional"
          body={dialogBody}
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
          ativo === true
            ? "adicional column py-5  "
            : "adicional column py-5   desativado"
        }
      >
        <h3>
          <p>{nome}</p>
        </h3>
        <div className="flex  my-2">
          <p className="mx-2 text-center">
            Produto: {nomeProduto} || Preço: R${" "}
            {preco.toFixed(2).toString().replace(".", ",")}
          </p>
        </div>
        <div className="delete">
          <button
            type="button"
            className="titleGrad1 poppins ver"
            onClick={() => {
              // deleteAdicional(id);
              setOpenDialogDelete(true);
            }}
          >
            Deletar
          </button>
          <button
            className="editProduto"
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
    </>
  );
}
