/* eslint-disable react/no-array-index-key */
import React from "react";

import { listIcons } from "./icons";
import InputSearch from "./inputSearch";

interface IIconChooser {
  changeIcon: any;
}
export default function IconChooser({ changeIcon }: IIconChooser) {
  return (
    <div className="pick">
      {listIcons.map((item, key) => {
        return (
          <button
            type="button"
            className="iconPickerButton"
            onClick={(e) => {
              changeIcon(item);
            }}
          >
            <i className={`fa-solid fa-${item} fa-2x m-2`} key={key} />
          </button>
        );
      })}
    </div>
  );
}
