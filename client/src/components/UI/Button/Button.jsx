import React from "react";
import cl from "./Button.module.css";

export const Button = ({
  children,
  onClick,
  type,
  style,
  text,
  className,
  disabled,
}) => {
  return (
    <div
      className={`${disabled && cl.disabled} ${cl.button} ${
        type === "fill" && cl.fill
      } ${className} }`}
      onClick={(e) => {
        if (disabled) return;
        onClick(e);
      }}
      style={style}
    >
      {text}
      {children}
    </div>
  );
};
