/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import Multiselect from "multiselect-react-dropdown";
import React, { useState, useEffect } from "react";
import { IconPicker } from "react-fa-icon-picker";
import "../style.css";

import { useForm, Controller } from "react-hook-form";
import { error } from "console";

import Alert from "../../../Componentes/Alert";
import Dialog from "../../../Componentes/dialog";
import IconChooser from "../../../Componentes/iconChooser";
import Input from "../../../Componentes/input";
import SaveBtn from "../../../Componentes/saveBtn";
import SelectInput from "../../../Componentes/select";
import TextArea from "../../../Componentes/textArea";
import api from "../../../services/api";

interface IProps {
  setGetProduto: any;
}

export default function NovoProduto({ setGetProduto }: IProps) {
  const [categorias, setCategorias] = useState<any[]>();
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState("");
  const [check, setCheck] = useState(true);
  const [image, setImage] = useState<string | undefined>();
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const postData = async (data: any) => {
    try {
      console.log(data);
      console.log(selected, image);
      const newData = {
        nome: data.nomeProduto,
        preco: parseFloat(data.precoProduto.toString().replace(",", ".")),
        categoriaId: data.categoriaSelect,
        ativo: check,
        imagem: image,
        porcao: data.qtdePessoasProduto,
        descricao: data.descricaoProduto,
      };

      await api.post("/Produto", newData);

      reset();
      setImage(undefined);
      setGetProduto();
      setOpenDialog(false);
    } catch (err: any) {
      console.error(err);
    }
  };
  const getCategorias = async () => {
    try {
      const response = await api.get("/Categoria");
      setCategorias(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategorias();

    if (errors.nomeProduto) {
      try {
        switch (errors.nomeProduto.type) {
          case "required":
            setErroMessage("Por favor, insira um nome para o produto");
            break;
          case "maxLength":
            setErroMessage(
              "Por favor, insira um nome para o produto com até 30 caracteres"
            );
            break;
          default:
            break;
        }
      } finally {
        setCloseAlert(true);
      }
    } else if (errors.imagemProduto) {
      try {
        switch (errors.imagemProduto.type) {
          case "required":
            setErroMessage(
              "Por favor, insira uma imagem nos formatos .png, .jpg ou .jpeg"
            );
            break;

          default:
            break;
        }
      } finally {
        setCloseAlert(true);
      }
    } else if (errors.precoProduto) {
      try {
        switch (errors.precoProduto.type) {
          case "required":
            setErroMessage("Por favor, insira um preço para seu produto");
            break;
          case "pattern":
            setErroMessage(
              "Por favor, insira um preço válido para seu produto"
            );
            break;
          default:
            break;
        }
      } finally {
        setCloseAlert(true);
      }
    } else if (errors.descricaoProduto) {
      try {
        switch (errors.descricaoProduto.type) {
          case "required":
            setErroMessage("Por favor, insira uma descrição para seu produto");
            break;
          case "maxLength":
            setErroMessage(
              "Por favor, insira uma descrição para o produto com até 100 caracteres"
            );
            break;
          default:
            break;
        }
      } finally {
        setCloseAlert(true);
      }
    } else if (errors.qtdePessoasProduto) {
      try {
        switch (errors.qtdePessoasProduto) {
          case "required":
            setErroMessage("Por favor, insira uma quantidade de pessoas");
            break;
          case "maxLength":
            setErroMessage(
              "Por favor, insira um número com no máximo dois caracteres"
            );
            break;
          default:
            break;
        }
      } finally {
        setCloseAlert(true);
      }
    }
  }, [
    errors.nomeProduto,
    errors.imagemProduto,
    errors.precoProduto,
    errors.descricaoProduto,
    errors.qtdePessoasProduto,
  ]);

  const dialogBody = (
    <div className="novoProdutoDialogBody">
      <form onSubmit={handleSubmit(postData)}>
        {image && (
          <div className="imagemAtual">
            <img src={image} alt="" />
          </div>
        )}
        <div className="inputFileDiv">
          <label htmlFor="file" className="fileInput titleGrad2 ver poppins ">
            <i className="fa fa-upload px-2" />
            Enviar arquivo
          </label>
          {!image && <p>São aceitos arquivos no formato .png .jpeg e .jpg </p>}
          <input
            type="file"
            {...register("imagemProduto", {
              required: true,
            })}
            accept="image/png,image/jpeg, image/jpg"
            className="poppins"
            name="file"
            id="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              const base64 = await convertBase64(file);
              setImage(String(base64));
            }}
          />
        </div>
        <div className=" precoNomeQtde">
          <div className="input-box">
            <div className="inputDefaultContainer ">
              <label htmlFor="nomeProduto">Nome: </label>
              <input
                type="text"
                {...register("nomeProduto", {
                  required: true,
                  maxLength: 30, // JS only: <p>error message</p> TS only support string
                })}
                name="nomeProduto"
                className={
                  errors.nomeProduto ? `poppins my-2 invalid` : `poppins my-2 `
                }
                style={{ fontFamily: "Poppins" }}
                placeholder="Nome do produto..."
              />
            </div>
          </div>
          <div className="input-box">
            <div className="inputDefaultContainer ">
              <label htmlFor="precoProduto">Preço:</label>
              <input
                type="text"
                {...register("precoProduto", {
                  required: "Por favor insira o preço do produto",

                  pattern: {
                    value: /(\$?(:?\d+,?.?)+)/,
                    message: "Por favor, digite um preço válido",
                  },
                })}
                name="precoProduto"
                className={
                  errors.precoProduto ? `poppins my-2 invalid` : `poppins my-2 `
                }
                style={{ fontFamily: "Poppins" }}
                placeholder="R$ 00,00"
              />
            </div>
          </div>
          <div className="input-box">
            <div className="inputDefaultContainer ">
              <label htmlFor="qtdePessoasProduto">Serve:</label>
              <div className="flex align-itens-center">
                <input
                  type="number"
                  min="1"
                  max="20"
                  {...register("qtdePessoasProduto", {
                    required:
                      "Por favor insira quantas pessoas o produto serve",
                    maxLength: 2,
                  })}
                  name="qtdePessoasProduto"
                  className={
                    errors.qtdePessoasProduto
                      ? `poppins my-2 invalid`
                      : `poppins my-2 `
                  }
                  style={{ fontFamily: "Poppins" }}
                  placeholder="0"
                />
                <p className="pessoas">Pessoas</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-itens-center input-box pt-2">
          <div className="inputDefaultContainer ">
            <label htmlFor="descricaoProduto">Descrição </label>
            <textarea
              {...register("descricaoProduto", {
                required: "Por favor insira a descrição do produto",
                maxLength: 100,
              })}
              name="descricaoProduto"
              className={
                errors.descricaoProduto
                  ? `poppins my-2 invalid`
                  : `poppins my-2 `
              }
              style={{ fontFamily: "Poppins" }}
              placeholder="Descrição do produto..."
            />
          </div>
        </div>

        <div className="input-box">
          <div className="inputDefaultContainer ">
            <label htmlFor="categoriaSelect">Categorias</label>
            <select
              {...register("categoriaSelect", {
                required: "Por favor selecione alguma categoria", // JS only: <p>error message</p> TS only support string
              })}
              name="categoriaSelect"
              className={
                errors.categoriaSelect
                  ? `poppins my-2 invalid`
                  : `poppins my-2 `
              }
              onChange={(e: any) => setSelected(e.target.value)}
            >
              {/* <option className="poppins" disabled selected>
                [selecione]
              </option> */}
              {categorias?.map(
                (categoria) =>
                  categoria.ativo && (
                    <option
                      className="poppins"
                      value={categoria.id}
                      key={categoria.id}
                    >
                      {categoria.nome}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>

        <div className="flex align-itens-center inputToggle">
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
          title="Novo Produto"
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
              <div className="adiconarButton">Novo produto</div>
              <div className="adicionarTexto poppins">+Adicionar Produto</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
