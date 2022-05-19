/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <p className="login-title mb-5">Login</p>
        <div className="input-box login-input">
          <div className="inputDefaultContainer mb-3">
            <label htmlFor="name">Nome</label>

            <input
              type="text"
              className="poppins my-2"
              style={{ fontFamily: "Poppins" }}
              placeholder="Digite o nome de usuário..."
              value=""
            />
          </div>

          <div className="inputDefaultContainer mb-3">
            <label htmlFor="password">Senha</label>

            <input
              type="text"
              className="poppins my-2"
              style={{ fontFamily: "Poppins" }}
              placeholder="Digite o nome de usuário..."
              value=""
            />
          </div>
        </div>
        <button className="login-button" type="submit">
          Efetuar Login
        </button>
      </div>
    </div>
  );
}

export default Login;
