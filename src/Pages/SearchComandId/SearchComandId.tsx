import React, { useEffect, useState } from "react";

import BtnVoltar from "../../Componentes/btnVoltar";
import Dialog from "../../Componentes/dialog";
import InputSearch from "../../Componentes/inputSearch";
import api from "../../services/api";
import Pedido from "../FilaPedidos/Componentes/pedido";
import ItemSelecionadoToprint from "./Componentes/itemSelecionadoToprint";
import "./SearchComandId.css";

function SearchComandId() {
  const [pedidosComanda, setPedidosComanda] = useState<any>();
  const [searchId, setSearchId] = useState<any>();
  const [qrcode, setQrcode] = useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPedido, setOpenDialogPedido] = useState(false);
  const count = 0;
  const getPedidosComanda = async () => {
    try {
      const response = await api.get(`/Pedido/Comanda?id=${searchId}`);
      setPedidosComanda(response.data.data);
      console.log(response.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getValor = () => {
    let count = 0;
    pedidosComanda?.forEach((element: any) => {
      count += element.total;
      console.log("Acumulado", count);
    });
    console.log("final:", count);
    return count;
  };

  const gerarQrCode = async () => {
    try {
      const data = {
        restauranteId: JSON.parse(localStorage.getItem("restaurante")!),
      };

      const responseGet = await api.get(`/Comanda/Individual?id=${searchId}`);

      const GoogleChartAPI =
        "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=";
      const conteudoQRCode =
        GoogleChartAPI +
        encodeURIComponent(`http://www.fatecfood.com.br/${searchId}`);
      setQrcode(conteudoQRCode);
    } catch (err: any) {
      setQrcode(undefined);
    }
  };

  const toPrint = (
    <div className="toPrintWrapper">
      <div className="toPrint">
        <div id="toPrint">
          <div className="poppins px-5 pt-5">
            {" "}
            <div className="text-center">
              <p className="poppins" id="printTitle">
                FATEC FOOD
              </p>
              <p className="poppins" id="decor">
                ------------
              </p>

              <img src={qrcode} alt="" id="qrcode" />
              <p className="pb-5">NÚMERO DA COMANDA: {searchId}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="titleGrad1 poppins p-5 print  "
            onClick={() => {
              const printContents =
                document.getElementById("toPrint")!.innerHTML;
              const originalContents = document.body.innerHTML;

              document.body.innerHTML = printContents;
              const body = document.getElementsByTagName("html")[0];

              const decor = document.getElementById("decor");

              body.style.maxWidth = "58mm";
              body.style.maxHeight = "5cm";

              body.style.fontSize = "8px";
              const qrcodeImg = document.getElementById("qrcode");
              qrcodeImg!.style.maxWidth = "10rem";

              decor!.style.display = "none";
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
      </div>
    </div>
  );

  const toPrintPedido = (
    <div className="flex align-itens-center justify-content-center column scroll">
      <div className="imprimir text-left" id="imprimir">
        <b className="poppins"> Número da comanda: </b>
        {searchId}

        {pedidosComanda?.map((element: any) => {
          return (
            <ul className="m-2 flex column flex py-2 poppins">
              <li className="poppins">
                <b className="poppins"> Pedido: </b>
                {element.id}
              </li>

              {element.itemSelecionado?.map((item: any) => {
                console.log(item);
                return (
                  <ItemSelecionadoToprint
                    id={item.id}
                    observacoes={item.observacoes}
                    produtoId={item.produtoId}
                    quantidade={item.quantidade}
                    adicionais={item.adicionalSelecionado}
                  />
                );
              })}
              <li className="poppins">
                <b className="poppins"> Total pedido: </b>
                {element.total.toFixed(2).toString().replace(".", ",")}
              </li>
            </ul>
          );
        })}

        {/* // map((element:any)=> {return <ul className="m-2 flex column flex py-2 poppins">
        //     <li className="poppins">
        //       <b className="poppins"> Pedido: </b>
        //       {element.id}
        //     </li></ul>} */}
        {/* <ul>
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
           
          </ul>
        </ul> */}

        <p>---------------------</p>

        <p className="Poppins pb-5">
          <b>VALOR TOTAL:</b>{" "}
          {getValor().toFixed(2).toString().replace(".", ",")}
        </p>
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
    <>
      {openDialogPedido && (
        <Dialog
          closeDialog={setOpenDialogPedido}
          body={toPrintPedido}
          title=""
        />
      )}
      {openDialog && (
        <Dialog closeDialog={setOpenDialog} body={toPrint} title="" />
      )}
      <div className="search-comand-id">
        <div className="search-comand-id__conteiner">
          <div className="search-comand-id__header input-box">
            <BtnVoltar />
            <p className="search-comand-id__title">Pesquisar comanda por ID</p>
            <div className="inputSearchContainer">
              <input
                type="text"
                placeholder="Digite o id da comanda..."
                className="poppins"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                }}
              />
              <button
                className="submit-lente"
                type="submit"
                onClick={() => {
                  getPedidosComanda();
                  gerarQrCode();
                }}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>

          {qrcode ? (
            <div className=" flex column justify-content-center align-itens-center qrcode">
              <p className="my-2 comanda">Comanda - ID: {searchId}</p>
              <img src={qrcode} alt="" />

              <button
                type="button"
                className="titleGrad1 ver  poppins mt-3  "
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Imprimir
              </button>
            </div>
          ) : (
            <div className="comandaNotFound poppins">
              Procure uma comanda existente...
            </div>
          )}
          {pedidosComanda && (
            <div className="totalContainer">
              <div className="totalBox">
                <div className="total my-3 p-3 ">
                  Total da comanda R$
                  {getValor().toFixed(2).toString().replace(".", ",")}
                  {/* {pedidosComanda?.map((e: any) => parseFloat(count + parseFloat(e.total))} */}
                  <button
                    type="button"
                    className="titleGrad1 ver lightbg poppins mr-3 "
                    onClick={() => {
                      setOpenDialogPedido(true);
                    }}
                  >
                    Imprimir
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="listaPedidos">
            {pedidosComanda?.map((element: any) => {
              return (
                <Pedido
                  total={element.total}
                  comanda={element.comandaId}
                  data={element.data}
                  id={element.id}
                  itemSelecionado={element.itemSelecionado}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchComandId;
