/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import Multiselect from "multiselect-react-dropdown";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import Dialog from "../../../Componentes/dialog";
import SaveBtn from "../../../Componentes/saveBtn";
import api from "../../../services/api";

// const { API_URL } = process.env;

interface IProps {
  porcao: number;
  img: string;
  preco: number;
  setGetProduto: any;
  id: number;
  ativo: boolean;
  adicionais: any;
  descricao: string;
  nome: string;
  categoriaId: number;
}

export default function ListaProdutos({
  img,
  nome,
  adicionais,
  id,
  preco,
  descricao,
  ativo,
  categoriaId,
  setGetProduto,
  porcao,
}: IProps) {
  const [selected, setSelected] = useState(categoriaId);

  const [categoriaNome, setCategoriaNome] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [check, setCheck] = useState(ativo);
  const getCategoriaIndividual = async (idCat: number) => {
    try {
      const response = await api.get(`/Categoria/Individual?id=${idCat}`);
      setCategoriaNome(response.data.data[0].nome);
    } catch (err: any) {
      console.error(err);
    }
  };
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

  async function parseURI(d: any) {
    const reader = new FileReader();
    reader.readAsDataURL(d);
    return new Promise((res, rej) => {
      reader.onload = (e) => {
        res(e.target?.result);
      };
    });
  }

  async function getDataBlob(url: any) {
    const res = await fetch(url);
    const blob = await res.blob();
    const uri = await parseURI(blob);
    return uri;
  }

  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const updateData = async (dados: any) => {
    const blob = await getDataBlob(`http://localhost:5000${img}`);

    const newData = {
      id,
      nome: dados.nomeProduto,
      preco: parseFloat(dados.precoProduto.toString().replace(",", ".")),
      categoriaId: dados.categoriaSelect,
      ativo: check,
      descricao: dados.descricaoProduto,
      porcao: dados.qtdePessoasProduto,
      imagem: image || blob,
    };

    const response = await api.put(`/Produto?id=${id}`, newData);
    console.log(response);

    setOpenDialogEdit(false);
    setGetProduto();
    window.location.reload();
  };

  const [categorias, setCategorias] = useState<any[]>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const getCategorias = async () => {
    const response = await api.get("/Categoria");
    setCategorias(response.data.data);
  };

  const deleteProduto = async (id: any) => {
    const response = await api.delete(`/Produto?id=${id}`);
    window.location.reload();

    console.log(response.data);
  };

  useEffect(() => {
    getCategorias();
    getCategoriaIndividual(categoriaId);
  }, []);
  const dialogBody = (
    <div>
      <div className="flex details-container">
        <div className="detailFoto">
          <img src={`http://localhost:5000${img}`} alt="" />
        </div>
        <div className="flex column px-4 details-comlumn">
          <h2 className="deatils-name">{nome}</h2>

          <div className="my-1 line-container">
            <span>Código</span>
            <p className="width-column">{id}</p>
          </div>

          <div className="my-1 line-container">
            <span>Preço</span>
            <span className="width-column">
              R$ {preco.toFixed(2).toString().replace(".", ",")}
            </span>
          </div>

          <div className="my-1 line-container">
            <span>Categoria</span>
            <span className="titleGrad1 nomeCategoria poppins small width-column">
              {categoriaNome}
            </span>
          </div>

          <div className="my-1 line-container">
            <span>Descrição</span>
            <p className="width-column">{descricao}</p>
          </div>

          <button
            type="button"
            className="deletar poppins small"
            onClick={() => {
              setOpenDialogDelete(true);
              setOpenDialog(false);
            }}
          >
            Deletar produto
          </button>
        </div>
      </div>
    </div>
  );
  const dialogEditbody = (
    <div className="novaCategoriaDialogBody">
      <form onSubmit={handleSubmit(updateData)}>
        <div className=" align-itens-center">
          <div className="imagemAtual">
            <img src={image || `http://localhost:5000/${img}`} alt="" />
          </div>{" "}
          <label htmlFor="file" className="fileInput titleGrad2 ver poppins">
            <i className="fa fa-upload px-2" />
            Enviar arquivo
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg, image/jpg"
            className="poppins inputfile"
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
                defaultValue={nome}
                type="text"
                {...register("nomeProduto", {
                  required: "Por favor insira o nome do produto", // JS only: <p>error message</p> TS only support string
                })}
                name="nomeProduto"
                className={
                  errors.nomeProduto ? `poppins my-2 invalid` : `poppins my-2 `
                }
                style={{ fontFamily: "Poppins" }}
                placeholder="Nome do produto..."
                // onChange={(e) => setNomeProduto(e.target.value)}
              />
            </div>
          </div>
          <div className="input-box">
            <div className="inputDefaultContainer ">
              <label htmlFor="precoProduto">Preço:</label>
              <input
                type="text"
                defaultValue={preco}
                {...register("precoProduto", {
                  required: "Por favor insira o preço do produto",
                  maxLength: 80,
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
                  defaultValue={porcao}
                />
                <p className="pessoas">Pessoas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex align-itens-center input-box pt-2">
          <div className="inputDefaultContainer ">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="descricaoProduto">Descrição </label>
            <textarea
              {...register("descricaoProduto", {
                required: "Por favor insira a descrição do produto",
                maxLength: 240,
              })}
              defaultValue={descricao}
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
          {/* <TextArea
        name="descricaoProduto"
        label="Descrição:"
        placeholder="Descrição do produto..."
      /> */}
        </div>

        <div className="input-box">
          {/* <SelectInput
       
        name="categoriaSelect"
        label="Categorias:"
        options={["banana", "maça"]}
      /> */}
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
              defaultValue={selected}
              onChange={(e: any) => setSelected(e.target.value)}
            >
              <option className="poppins" disabled selected>
                [selecione]
              </option>
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
            {/* <Multiselect
          displayValue="nome"
          className="my-2 ml-0 poppins"
          placeholder="[Selecione]"
          isObject
          onRemove={(event) => {
            setSelected(event);
          }}
          onSelect={(event) => {
            setSelected(event);
          }}
          options={categorias}
        />
     
    */}{" "}
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

  const dialogBodyDelete = (
    <div className="delete-dialog">
      <div className="delete-dialog__content">
        <p className="delete-dialog__text">Deseja mesmo deletar Adicional?</p>
        <div className="delete-dialog__buttons-container">
          <button
            type="button"
            className="button-delete-dialog-true"
            onClick={() => {
              deleteProduto(id);
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

  return (
    <>
      {openDialog && (
        <Dialog closeDialog={setOpenDialog} body={dialogBody} title="" />
      )}
      {openDialogEdit && (
        <Dialog
          closeDialog={setOpenDialogEdit}
          body={dialogEditbody}
          title="Editar Produto"
        />
      )}
      {openDialogDelete && (
        <Dialog
          closeDialog={setOpenDialogDelete}
          title=""
          body={dialogBodyDelete}
        />
      )}
      <div className={ativo === true ? "produto" : "produto desativado"}>
        <img src={`http://localhost:5000/${img}`} alt="" />
        <div className="flex align-itens-center column mt-1 justify-content-center">
          <p className="nome">{nome}</p>
          <div className="ver-edit">
            <div className="button">
              <button
                type="button"
                className="titleGrad1 ver  poppins "
                onClick={() => {
                  // getProduto();
                  getCategoriaIndividual(categoriaId);
                  setOpenDialog(true);
                }}
              >
                VER
              </button>

              <button
                type="button"
                className="titleGrad1 poppins ver deletar-produto"
                onClick={() => {
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
                  setOpenDialogEdit(true);
                }}
              >
                <i className="fa-solid fa-pen " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
