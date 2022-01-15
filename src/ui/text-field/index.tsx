import React, { InputHTMLAttributes } from "react";
import css from "./index.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField(props: TextFieldProps) {
  return (
    <div className={css.container}>
      <label className={css.label}>
        {props.label} <input {...props} className={css.input} />
      </label>
    </div>
  );
}

interface TextAreaFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextArea(props: TextAreaFieldProps) {
  return (
    <div className={css.container}>
      <label className={css.label}>
        {props.label} <textarea {...props} className={css.textarea} />
      </label>
    </div>
  );
}
