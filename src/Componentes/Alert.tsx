import React from "react";
import {
  AiFillCheckCircle,
  AiOutlineClose,
  AiFillCloseCircle,
  AiFillExclamationCircle,
} from "react-icons/ai";

interface IProps {
  closeAlert: any;
  message: any;
  status: string;
}

function Alert({ closeAlert, message, status }: IProps) {
  return (
    <div className={`alert ${status}`}>
      <div className="alert-icon">
        {status === "error" && <AiFillCloseCircle />}
        {status === "succes" && <AiFillCheckCircle />}
        {status === "warning" && <AiFillExclamationCircle />}
      </div>
      <div className="alert-message">{message}</div>
      <button
        type="button"
        className="alert-close"
        onClick={() => {
          closeAlert(false);
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
}

export default Alert;
