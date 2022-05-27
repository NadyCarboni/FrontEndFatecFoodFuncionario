import React, { useEffect, useState } from "react";

import BtnVoltar from "../../Componentes/btnVoltar";
import InputSearch from "../../Componentes/inputSearch";
import api from "../../services/api";
import Pedido from "../FilaPedidos/Componentes/pedido";
import "./SearchComandId.css";

function SearchComandId() {
  const [pedidosComanda, setPedidosComanda] = useState<any>();
  const [searchId, setSearchId] = useState<any>();

  const getPedidosComanda = async () => {
    const response = await api.get(`/Pedido/Comanda?id=${searchId}`);
    setPedidosComanda(response.data.data);
  };

  console.log("pedidosComanda: ", pedidosComanda);

  return (
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
              }}
            >
              <i className="fa fa-search" />
            </button>
          </div>
        </div>

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
