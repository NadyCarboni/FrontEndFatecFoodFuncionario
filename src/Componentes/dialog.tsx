import React from "react";

interface IProps {
  closeDialog: any;
  title: any;
  body: any;
}

export default function Dialog({ closeDialog, title, body }: IProps) {
  return (
    <div className="dialogBackground">
      <div className="dialogContainer">
        <button
          className="dialogButton"
          type="button"
          onClick={() => {
            closeDialog(false);
          }}
        >
          <i className="fa-solid fa-xmark fa-2x" />
        </button>
        <div className="dialogDetail">
          <div className="dialogTitle mb-3">
            <h2>{title}</h2>
          </div>
          <div className="dialogBody">{body}</div>
        </div>
      </div>
    </div>
  );
}
