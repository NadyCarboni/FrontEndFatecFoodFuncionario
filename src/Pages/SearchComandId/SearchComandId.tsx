import React, { useEffect, useState } from "react";

import BtnVoltar from "../../Componentes/btnVoltar";
import Dialog from "../../Componentes/dialog";
import InputSearch from "../../Componentes/inputSearch";
import api from "../../services/api";
import Pedido from "../FilaPedidos/Componentes/pedido";
import "./SearchComandId.css";

function SearchComandId() {
  const [pedidosComanda, setPedidosComanda] = useState<any>();
  const [searchId, setSearchId] = useState<any>();
  const [qrcode, setQrcode] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const getPedidosComanda = async () => {
    const response = await api.get(`/Pedido/Comanda?id=${searchId}`);
    setPedidosComanda(response.data.data);
  };

  const gerarQrCode = async () => {
    const data = {
      restauranteId: JSON.parse(localStorage.getItem("restaurante")!),
    };
    const response = await api.post("/Comanda", data);

    const responseGet = await api("/Comanda");
    const comandaNovaId =
      responseGet.data.data[responseGet.data.data.length - 1];

    const GoogleChartAPI =
      "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=";
    const conteudoQRCode = GoogleChartAPI + encodeURIComponent(searchId);
    setQrcode(conteudoQRCode);
  };

  console.log("pedidosComanda: ", pedidosComanda);

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

  return (
    <div className="search-comand-id">
      {openDialog && (
        <Dialog closeDialog={setOpenDialog} body={toPrint} title="" />
      )}
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

        {qrcode && (
          <div className=" flex column justify-content-center align-itens-center qrcode">
            <p className="my-2 comanda">Última comanda - ID: {searchId}</p>
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
        )}

        <div className="listaPedidos">
          {pedidosComanda?.map((element: any) => {
            return (
              <Pedido
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
  );
}

export default SearchComandId;
