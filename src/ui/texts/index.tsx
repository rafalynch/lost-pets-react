import React from "react";
import css from "./index.css";

export function CustomTitle({ children }) {
  return <h1 className={css.title}>{children}</h1>;
}

export function CustomSubtitle({ children }) {
  return <h2 className={css.subtitle}>{children}</h2>;
}

export function SubtitleBold({ children }) {
  return <h2 className={css["subtitle-bold"]}>{children}</h2>;
}

export function CustomLongText({ children }) {
  return <p className={css["long-text"]}>{children}</p>;
}

export function LongTextBold({ children }) {
  return <p className={css["long-text-bold"]}>{children}</p>;
}
