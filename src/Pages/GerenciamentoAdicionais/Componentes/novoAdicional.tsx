/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Alert from "../../../Componentes/Alert";
import Dialog from "../../../Componentes/dialog";
import IconChooser from "../../../Componentes/iconChooser";
import Input from "../../../Componentes/input";
import SaveBtn from "../../../Componentes/saveBtn";
import api from "../../../services/api";

export default function NovoAdicional() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [icon, setIcon] = useState("fa-circle-plus");
  const [added, setAdded] = useState(false);
  const [adicionais, setAdicionais] = useState<any[]>();
  const [value, setValue] = useState();
  const [produtos, setProdutos] = useState<any[]>();
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState("");
  const getProdutos = async () => {
    const response = await api.get("/Produto");
    console.log(response.data.data);
    setProdutos(response.data.data);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [check, setCheck] = useState(true);
  const [selected, setSelected] = useState();

  const postAdicional = async (data: any) => {
    console.log(data);
    const newData = {
      nome: data.nomeAdicional,
      preco: parseFloat(data.precoAdicional.toString().replace(",", ".")),
      ativo: check,
      produtoId: data.produtoSelect,
    };
    console.log(newData);
    const response = await api.post("/Adicional", newData);
    setOpenDialog(false);
    window.location.reload();
    console.log(response);
  };
  useEffect(() => {
    getProdutos();
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

  const dialogBody = (
    <div className="novaCategoriaDialogBody">
      <form onSubmit={handleSubmit(postAdicional)}>
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
              />
            </div>
          </div>{" "}
          <div className="input-box">
            <div className="inputDefaultContainer ">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="precoAdional">Preço:</label>
              <input
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
              name="produtoSelect"
              className={
                errors.produtoSelect ? `poppins my-2 invalid` : `poppins my-2 `
              }
              onChange={(e: any) => setSelected(e.target.value)}
            >
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
  return (
    <>
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
          title="Novo adicional"
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
              <div className="adiconarButton">Novo Adicional</div>
              <div className="adicionarTexto poppins">+Adicionar Adicional</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
