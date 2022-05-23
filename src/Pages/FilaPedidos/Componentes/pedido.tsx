/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "./style.css";
import Dialog from "../../../Componentes/dialog";
import api from "../../../services/api";

export default function Pedido({ comanda, data, id, itemSelecionado }: any) {
  const [produtos, setProdutos] = useState<any[]>();
  let nomeProduto = "";
  const nomeProdutoToPrint = "";
  const [openDialog, setOpenDialog] = useState(false);

  const getDate = (data: any) => {
    const dataFormatada = new Date(data).toLocaleDateString();
    return dataFormatada;
  };
  const getProdutos = async () => {
    const response = await api.get("/Produto");
    console.log(response.data.data);
    setProdutos(response.data.data);
  };

  useEffect(() => {
    getProdutos();
  }, []);
  const toPrintPedido = (
    <div className="flex align-itens-center justify-content-center column">
      <div className="imprimir " id="imprimir">
        <ul>
          <ul className="m-2 flex column flex py-2 poppins">
            <li className="poppins">
              <b className="poppins"> Pedido: </b>
              {id}
            </li>
            <li className="poppins">
              <b className="poppins"> Número da comanda: </b>
              {comanda}
            </li>
            {itemSelecionado?.map((element: any) => {
              produtos?.forEach((produto: any) => {
                if (produto.id === element.produtoId) {
                  nomeProduto = produto.nome;
                }
              });
              return (
                <>
                  <li className="poppins">
                    <b className="poppins"> Observacões: </b>&quot;{" "}
                    {element.observacoes} &quot;
                  </li>
                  <li className="poppins">
                    <b className="poppins">Produto: </b>
                    {nomeProduto}
                  </li>
                  <li className="poppins">
                    <b className="poppins">Quantidade: </b>
                    {element.quantidade}
                  </li>
                </>
              );
            })}{" "}
          </ul>
        </ul>
      </div>
      <button
        type="button"
        className="titleGrad1 poppins p-5 print  "
        onClick={() => {
          const printContents = document.getElementById("imprimir")!.innerHTML;
          const originalContents = document.body.innerHTML;

          document.body.innerHTML = printContents;
          const body = document.getElementsByTagName("html")[0];

          body.style.maxWidth = "58mm";
          body.style.maxHeight = "5cm";

          body.style.fontSize = "8px";

          window.print();

          document.body.innerHTML = originalContents;
          document.location.reload();
        }}
      >
        <div className="flex column poppins">
          <i className="fa-solid fa-print fa-2x" />
          imprimir
        </div>
      </button>
    </div>
  );

  return (
    <div className="pedido m-3 flex py-4 column">
      {openDialog && (
        <Dialog closeDialog={setOpenDialog} body={toPrintPedido} title="" />
      )}
      <p className="mx-4">
        <span className="numeroPedido poppins small">Pedido {id}</span>
        <span className=" mx-2 titleGrad1 px-2 comanda">
          Comanda: {comanda}
        </span>
        <span className="">Data: {getDate(data)}</span>
        <button
          type="button"
          className="titleGrad1 ver  mx-2 poppins  "
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Imprimir
        </button>
      </p>
      <div className=" itemLista flex m-4">
        <div className="itemTitulo p-2">Itens selecionados:</div>
        <ul>
          {itemSelecionado?.map((element: any) => {
            produtos?.forEach((produto: any) => {
              if (produto.id === element.produtoId) {
                nomeProduto = produto.nome;
              }
            });
            return (
              <li className="item-selecionados ">
                <ul className="m-2 flex column flex py-2">
                  <li>
                    <span className="titleGrad1 small poppins mx-2 px-1">
                      Observacões:{" "}
                    </span>
                    {element.observacoes}
                  </li>
                  <li>
                    <span className="titleGrad1 small poppins mx-2 px-1">
                      Produto:{" "}
                    </span>
                    {nomeProduto}
                  </li>
                  <li>
                    <span className="titleGrad1 small poppins mx-2 px-1">
                      Quantidade:{" "}
                    </span>
                    {element.quantidade}
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <p>{itemSelecionado}</p> */}
    </div>
  );
}
