import React from "react";
import css from "./index.css";

type MainButtonProps = {
  children;
  color: "green" | "gray" | "pink";
  onClick?;
  type?;
};

export function MainButton(props: MainButtonProps) {
  const { color } = props;
  return (
    <button type={props.type} className={css[color]} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
