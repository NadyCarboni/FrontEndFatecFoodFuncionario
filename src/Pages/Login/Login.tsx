/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

import Alert from "../../Componentes/Alert";
import api from "../../services/api";
import "./Login.css";

function Login() {
  const [image, setImage] = useState<string | undefined>();
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [restaurant, setRestaurant] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState("succes");

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
    if (
      restaurant?.[0].login === userName &&
      restaurant?.[0].senha === password
    ) {
      setAlertStatus("succes");
      setAlertMessage("logado com sucesso");
      setCloseAlert(true);
      localStorage.setItem("isSigned", "true");
      localStorage.setItem("restaurante", `${restaurant?.[0].id}`);
      window.location.reload();
    } else {
      setAlertStatus("error");
      setAlertMessage("senha ou nome de usuário incorretos");
      setCloseAlert(true);
    }
  }

  const postRestaurante = async () => {
    setIsLoading(true);
    const state = {
      login: userName,
      senha: password,
      nome: name,
      imagem: image,
    };

    try {
      const response = await api.post(`/Restaurante`, state);
      setIsLoading(false);
      window.location.reload();
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
    <>
      {closeAlert && (
        <Alert
          message={alertMessage}
          closeAlert={setCloseAlert}
          status={alertStatus}
        />
      )}
      <div className="login">
        <div className="login-container">
          <p className="login-title mb-5">
            {restaurant?.[0] ? "Login" : "Cadastrar Restaurante"}
          </p>
          <div className="input-box login-input">
            {!restaurant?.[0] && (
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
              <label htmlFor="userName">Nome do usuário</label>

              <input
                type="text"
                className="poppins my-2 p-0"
                style={{ fontFamily: "Poppins" }}
                placeholder="Digite o nome do usuário..."
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            {!restaurant?.[0] && (
              <div
                className="inputDefaultContainer mb-3 w-60"
                style={{ width: "60% !important" }}
              >
                <label htmlFor="name">Nome do restaurante</label>

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
            )}

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
          {restaurant?.[0] ? (
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
    </>
  );
}

export default Login;
