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
          type="button"
          onClick={() => {
            closeDialog(false);
          }}
        >
          <i className="fa-solid fa-xmark fa-2x" />
        </button>
        <div className="dialogTitle">
          <h2>{title}</h2>
        </div>
        <div className="dialogBody">{body}</div>
      </div>
    </div>
  );
}
