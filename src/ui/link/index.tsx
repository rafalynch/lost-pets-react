import React from "react";
import css from "./index.css";

export function LinkButton(props) {
  return (
    <a onClick={props.onClick} className={css.link}>
      {props.children}
    </a>
  );
}
