import React from "react";
import { useNavigate } from "react-router-dom";

import BotaoMenu from "./Componentes/botaoMenu";

export default function Menu() {
  const navigate = useNavigate();
  return (
    <div>
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
          <button type="button">Gerar novo QR code</button>
          <button type="button">Exibir comandas</button>
          <button type="button">Exibir comanda por id</button>
        </div>
        <BotaoMenu
          tipo="filaPedidos"
          texto="Fila de pedidos"
          icon="fa-solid fa-plus"
          path="/pedidos"
        />
      </div>
    </div>
  );
}
