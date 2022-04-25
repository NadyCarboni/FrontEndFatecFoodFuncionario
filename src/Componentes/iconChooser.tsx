import React from "react";

import { listIcons } from "./icons";
import InputSearch from "./inputSearch";

export default function IconChooser() {
  return (
    <div className="pick">
      {listIcons.map((item, key) => {
        return (
          <button type="button" className="iconPickerButton">
            {/* eslint-disable-next-line react/no-array-index-key */}
            <i className={`fa-solid fa-${item} fa-2x m-2`} key={key} />
          </button>
        );
      })}
    </div>
  );
}
