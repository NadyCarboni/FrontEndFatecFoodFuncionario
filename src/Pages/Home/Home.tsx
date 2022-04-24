import React from "react";

import Header from "./Componentes/header";
import Menu from "./Componentes/menu/menu";

import "./style.css";

function Home() {
  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <Header />
          <Menu />
          {/* <footer>Fatec Food</footer> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
