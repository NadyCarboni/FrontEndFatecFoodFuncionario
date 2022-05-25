import React, { useState, useEffect } from "react";

import api from "../../services/api";
import Login from "../Login/Login";
import Header from "./Componentes/header";
import Menu from "./Componentes/menu/menu";

import "./style.css";

function Home() {
  const [error, setError] = useState<any>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [restaurant, setRestaurant] = useState<any>();
  const getRestaurante = async () => {
    try {
      const response = await api.get("/Restaurante");
      if (response) setRestaurant(response.data.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getRestaurante();
  }, []);

  // if (!isLogin) return <Login setIsLogin={(value) => setIsLogin(value)} />;

  return (
    <div>
      <div className="container ">
        <div className="main mx-5">
          <Header restaurant={restaurant} />
          <Menu />
          {/* <footer>Fatec Food</footer> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
