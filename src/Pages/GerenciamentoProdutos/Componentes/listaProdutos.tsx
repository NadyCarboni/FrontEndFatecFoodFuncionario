/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import Multiselect from "multiselect-react-dropdown";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import Dialog from "../../../Componentes/dialog";
import SaveBtn from "../../../Componentes/saveBtn";
import api from "../../../services/api";

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
  const [adicionalSelected, setAdicionalSelected] = useState(adicionais);
  const [categoriaNome, setCategoriaNome] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [check, setCheck] = useState(ativo);
  const getCategoriaIndividual = async (idCat: number) => {
    const response = await api.get(`/Categoria/Individual?id=${idCat}`);
    setCategoriaNome(response.data.data[0].nome);
    console.log(categoriaNome);
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
    const reader =
      new FileReader(); /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
    reader.readAsDataURL(
      d
    ); /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
    return new Promise((res, rej) => {
      /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
      reader.onload = (e) => {
        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
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
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  // const getAdicionais = async () => {
  //   const response = await api.get("/Adicional");
  //   setAdicionais(response.data.data);
  //   console.log(response.data.data);
  // };
  const updateData = async (dados: any) => {
    const blob = await getDataBlob(`http://54.175.22.87${img}`);

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
    // reset();
    setOpenDialogEdit(false);
    setGetProduto();
    window.location.reload();
  };
  const [nomeProduto, setNomeProduto] = useState(nome);
  const [categorias, setCategorias] = useState<any[]>();
  const [openDialog, setOpenDialog] = useState(false);

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
    // getAdicionais();
    getCategorias();
    getCategoriaIndividual(categoriaId);
  }, []);
  const dialogBody = (
    <div>
      <div className="flex">
        <div className="detailFoto">
          <img src={`http://54.175.22.87${img}`} alt="" />
        </div>
        <div className="flex column px-4">
          <button type="button" className="deletar poppins small">
            Deletar produto
          </button>
          <h2>{nome}</h2>
          <p className="my-2">Código: {id}</p>
          <p className="my-2">{descricao}</p>
          <p className="my-1 mt-3">
            Preço:{" "}
            <span>R$ {preco.toFixed(2).toString().replace(".", ",")}</span>
          </p>
          <p className="my-1 ">
            <span>Categoria:</span>
            <span className="titleGrad1 nomeCategoria poppins small ">
              {categoriaNome}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
  const dialogEditbody = (
    <div className="novaCategoriaDialogBody">
      <form onSubmit={handleSubmit(updateData)}>
        <div className=" align-itens-center">
          <div className="imagemAtual">
            <img src={image || `http://54.175.22.87${img}`} alt="" />
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
      <div className={ativo === true ? "produto" : "produto desativado"}>
        <img src={`http://54.175.22.87${img}`} alt="" />
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
                  deleteProduto(id);
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
