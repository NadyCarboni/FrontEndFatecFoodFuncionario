import React from "react";

import BotaoMenu from "./Componentes/botaoMenu";

export default function Menu() {
  return (
    <div>
      <div className="gerenciamento-row">
        <BotaoMenu
          tipo="categoria"
          texto="Gerenciar Categorias"
          icon="fa-solid fa-bars "
        />
        <BotaoMenu
          tipo="produtos"
          texto="Gerenciar Produtos"
          icon="fa-solid fa-cart-shopping"
        />
        <BotaoMenu
          tipo="comandasAtivas"
          texto="Gerenciar adicionais"
          icon="fa-solid fa-plus"
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
        />
      </div>
    </div>
  );
}
