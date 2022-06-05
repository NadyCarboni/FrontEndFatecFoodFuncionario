/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "./style.css";
import Dialog from "../../../Componentes/dialog";
import api from "../../../services/api";
import Adicionais from "../../GerenciamentoAdicionais/adicionais";
import ItemSelecionado from "./itemSelecionado";
import ItemSelecionadoToPrint from "./itemSelecionadoToPrint";

export default function Pedido({
  comanda,
  data,
  id,
  entregue,

  adicional,
}: any) {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [produtos, setProdutos] = useState<any[]>();
  const [nomeProduto, setNomeProduto] = useState<any>();
  const nomeProdutoToPrint = "";
  const [pedidoEntregue, setPedidoEntregue] = useState(entregue);
  const [openDialog, setOpenDialog] = useState(false);
  const [itensSelecionados, setItensSelecionados] = useState<any[]>([]);
  const getDate = (data: any) => {
    const dataFormatada = new Date(data).toLocaleDateString("pt-br");
    const horaFormatada = new Date(data).toLocaleTimeString("pt-br");
    return `${dataFormatada} - ${horaFormatada}`;
  };
  const deletePedido = async () => {
    const response = await api.delete(`/Pedido?id=${id}`);
    window.location.reload();

    console.log(response.data);
  };
  const getItemSelecionados = async () => {
    try {
      const response = await api.get("/ItemSelecionado");

      // const response = await api.get(`/ItemSelecionado/Pedido?id=${id}`);

      // setItensSelecionados(response.data.data);
      // console.log(response.data);
      response.data.data.forEach((element: any) => {
        if (element.pedidoId === id) {
          setItensSelecionados((itensSelecionados) => [
            ...itensSelecionados,
            element,
          ]);
          // console.log(itenSelecionados);
          // console.log(responseItens.data.data);
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  const getProdutos = async () => {
    const response = await api.get("/Produto");
    // console.log(response.data.data);
    setProdutos(response.data.data);
  };

  const dialogBodyDelete = (
    <div className="delete-dialog">
      <div className="delete-dialog__content">
        <p className="delete-dialog__text">Deseja mesmo cancelar pedido?</p>
        <div className="delete-dialog__buttons-container">
          <button
            type="button"
            className="button-delete-dialog-true"
            onClick={() => {
              deletePedido();
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
  const updateStatusPedido = async () => {
    try {
      const newData = {
        comandaId: comanda,
        entregue: !pedidoEntregue,
        data,
      };
      const response = await api.put(`/Pedido?id=${id}`, newData);
      console.log(response);
    } catch (err: any) {
      console.error(err);
    } finally {
      setPedidoEntregue(!pedidoEntregue);
    }
  };

  useEffect(() => {
    getItemSelecionados();
    getProdutos();
  }, [entregue]);
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
            {itensSelecionados?.map((element: any) => {
              // console.log(element);
              return (
                <ItemSelecionadoToPrint
                  id={element.id}
                  observacoes={element.observacoes}
                  produtoId={element.produtoId}
                  quantidade={element.quantidade}
                  adicionais={element.adicionalSelecionado}
                />
              );
            })}
            {/* {itensSelecionados?.map((element: any) => {
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
                  <li className="poppins">
                    <b className="poppins">Adicionais: </b>
                    {adicional?.map((e: any) => (
                      <div>{e.nome}</div>
                    ))}
                  </li>
                </>
              );
            })} */}
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
      {openDialogDelete && (
        <Dialog
          closeDialog={setOpenDialogDelete}
          title=""
          body={dialogBodyDelete}
        />
      )}
      <div className="mx-4 flex">
        <button
          type="button"
          // className="titleGrad1 ver  mb-3 poppins NaoEntregue p-2"
          className={
            pedidoEntregue === true
              ? "titleGrad1 ver  mb-3 poppins Entregue p-2 mx-1"
              : "titleGrad1 ver  mb-3 poppins NaoEntregue p-2 mx-1"
          }
          onClick={() => {
            updateStatusPedido();
          }}
        >
          {pedidoEntregue === true ? "Entregue" : "Não entregue"}
          {pedidoEntregue === true ? (
            <i className="fa-solid fa-check mx-1" />
          ) : (
            <i className="fa-solid fa-xmark mx-1" />
          )}
        </button>
        <button
          type="button"
          className=" titleGrad1 ver  mb-3 poppins deletePedido p-2 mx-1"
          onClick={() => {
            setOpenDialogDelete(true);
          }}
        >
          Cancelar pedido
        </button>
      </div>
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
          {itensSelecionados ? (
            itensSelecionados?.map((element: any) => {
              // console.log(element.adicionalSelecionado);
              return (
                <ItemSelecionado
                  id={element.id}
                  observacoes={element.observacoes}
                  produtoId={element.produtoId}
                  quantidade={element.quantidade}
                  adicionais={element.adicionalSelecionado}
                />
              );
            })
          ) : (
            <div className="flex align-itens-center justify-content-center">
              Nada foi adicionado
            </div>
          )}
        </ul>
      </div>
      {/* <p>{itemSelecionado}</p> */}
    </div>
  );
}
