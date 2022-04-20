import React from "react";

interface IProps {
  tipo: string;
  texto: string;
  icon: string;
}

export default function BotaoMenu({ tipo, texto, icon }: IProps) {
  return (
    <button
      className={`botaoMenu font-weight-600 ${tipo}`}
      type="button"
      onClick={() => {
        console.log(tipo);
      }}
    >
      <div className="inside">
        <i className={`fa-3x ${icon}`} />
        <div className="botao">{texto}</div>
      </div>
    </button>
  );
}
