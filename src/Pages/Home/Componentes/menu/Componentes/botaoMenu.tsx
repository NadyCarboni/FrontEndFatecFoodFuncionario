import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  tipo: string;
  texto: string;
  icon: string;
  path: string;
}

export default function BotaoMenu({ tipo, texto, icon, path }: IProps) {
  const navigate = useNavigate();
  return (
    <button
      className={`botaoMenu font-weight-600 ${tipo}`}
      type="button"
      onClick={() => navigate(`${path}`)}
    >
      <div className="inside">
        <i className={`fa-3x ${icon}`} />
        <div className="botao">{texto}</div>
      </div>
    </button>
  );
}
