import React, { useState } from "react";

import Login from "../Login/Login";
import Header from "./Componentes/header";
import Menu from "./Componentes/menu/menu";

import "./style.css";

function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // if (!isLogin) return <Login setIsLogin={(value) => setIsLogin(value)} />;

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
