/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

import api from "../../services/api";
import "./Login.css";

function Login() {
  const [image, setImage] = useState<string | undefined>();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [restaurant, setRestaurant] = useState<any>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const getRestaurante = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/Restaurante");
      if (response) setRestaurant(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurante();
  }, []);

  function Login() {
    if (restaurant?.[0].nome === name && restaurant?.[0].senha === password) {
      localStorage.setItem("isSigned", "true");
      window.location.reload();
    }
  }

  const postRestaurante = async () => {
    setIsLoading(true);
    const state = {
      login: "frango",
      senha: password,
      nome: name,
      imagem: image,
    };

    try {
      const response = await api.post(`/Restaurante`, state);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="loading-container">
        <AiOutlineLoading className="loading-icon" />
      </div>
    );

  return (
    <div className="login">
      <div className="login-container">
        <p className="login-title mb-5">
          {restaurant?.[0].id ? "Login" : "Cadastrar"}
        </p>
        <div className="input-box login-input">
          {!restaurant?.[0].id && (
            <>
              <p className="mb-4">Logo do Restaurante</p>
              {image && (
                <div className="imagemAtual">
                  <img src={image} alt="" />
                </div>
              )}
              <div className="inputFileDiv sign-image">
                <label
                  htmlFor="file"
                  className="fileInput titleGrad2 ver poppins "
                >
                  <i className="fa fa-upload px-2" />
                  Enviar arquivo
                </label>
                {!image && (
                  <p className="mt-3 mb-5">
                    São aceitos arquivos no formato .png .jpeg e .jpg{" "}
                  </p>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg, image/jpg"
                  required
                  className="poppins"
                  name="file"
                  id="file"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];

                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    const base64 = await convertBase64(file);
                    setImage(String(base64));
                  }}
                />
              </div>
            </>
          )}

          <div
            className="inputDefaultContainer mb-3 w-60"
            style={{ width: "60% !important" }}
          >
            <label htmlFor="name">Nome</label>

            <input
              type="text"
              className="poppins my-2 p-0"
              style={{ fontFamily: "Poppins" }}
              placeholder="Digite o nome do restaurante..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="inputDefaultContainer mb-3 w-60">
            <label htmlFor="password">Senha</label>

            <input
              type="password"
              className="poppins my-2 p-0"
              style={{ fontFamily: "Poppins", paddingLeft: "0 !important" }}
              placeholder="Digite o nome de usuário..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        {restaurant?.[0].id ? (
          <button
            className="login-button"
            type="submit"
            onClick={() => {
              Login();
            }}
          >
            Efetuar Login
          </button>
        ) : (
          <button
            className="login-button"
            type="submit"
            onClick={() => {
              postRestaurante();
            }}
          >
            Cadastrar
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
