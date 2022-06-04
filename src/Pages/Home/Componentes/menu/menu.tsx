import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "../../../../Componentes/dialog";
import api from "../../../../services/api";
import BotaoMenu from "./Componentes/botaoMenu";
import Comanda from "./Componentes/comanda";

// export IProps = {

// }

export default function Menu() {
  const [qrcode, setQrcode] = useState("");
  const [codComanda, setCodComanda] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogTodasComandas, setOpenDialogTodasComandas] = useState(false);
  const [comandasArray, setComandasArray] = useState<any>();

  const [itemPedido, setItemPedido] = useState<any>();
  const navigate = useNavigate();
  const getComandas = async () => {
    try {
      const response = await api.get("/Comanda");

      setComandasArray(response.data.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getPedido = async () => {
    try {
      const response = await api.get("/Pedido");
      setItemPedido(response.data.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComandas();
    getPedido();
  }, []);
  const gerarQrCode = async () => {
    try {
      const data = {
        restauranteId: JSON.parse(localStorage.getItem("restaurante")!),
      };
      await api.post("/Comanda", data);

      const responseGet = await api.get("/Comanda");
      const comandaNovaId =
        responseGet.data.data[responseGet.data.data.length - 1];

      const GoogleChartAPI =
        "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=";

      const conteudoQRCode =
        GoogleChartAPI +
        encodeURIComponent(`http://www.fatecfood.com.br/${comandaNovaId.id}`);
      setCodComanda(comandaNovaId.id);
      setQrcode(conteudoQRCode);
    } catch (err: any) {
      console.error(err);
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
              <p className="pb-5">NÚMERO DA COMANDA: {codComanda}</p>
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

  const comandas = (
    <div className="comandas">
      {comandasArray &&
        comandasArray?.map((element: any) => {
          return <Comanda id={element.id} pedido={element.pedido} />;
        })}
    </div>
  );

  return (
    <div>
      {openDialog && (
        <Dialog closeDialog={setOpenDialog} body={toPrint} title="" />
      )}
      {openDialogTodasComandas && (
        <Dialog
          closeDialog={setOpenDialogTodasComandas}
          body={comandas}
          title=""
        />
      )}
      <div className="gerenciamento-row">
        <BotaoMenu
          tipo="categoria"
          texto="Gerenciar Categorias"
          icon="fa-solid fa-bars "
          path="/categorias"
        />
        <BotaoMenu
          tipo="produtos"
          texto="Gerenciar Produtos"
          icon="fa-solid fa-cart-shopping"
          path="/produtos"
        />
        <BotaoMenu
          tipo="adicionais"
          texto="Gerenciar adicionais"
          icon="fa-solid fa-plus"
          path="/adicionais"
        />
        <div className="botoesComanda flex column justify-content-center">
          <button type="button" onClick={() => gerarQrCode()}>
            Gerar novo QR code
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenDialogTodasComandas(true);
            }}
          >
            Exibir comandas
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/comandaId");
            }}
          >
            Exibir comanda por id
          </button>
        </div>
        <BotaoMenu
          tipo="filaPedidos"
          texto="Fila de pedidos"
          icon="fa-solid fa-plus"
          path="/pedidos"
        />
        {qrcode && (
          <div className=" flex column justify-content-center align-itens-center qrcode">
            <p className="my-2 comanda">Última comanda - ID: {codComanda}</p>
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
      </div>
    </div>
  );
}
