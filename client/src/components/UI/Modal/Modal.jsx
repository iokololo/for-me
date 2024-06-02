import React, { useEffect, useMemo } from "react";
import cl from "./Modal.module.css";

export const Modal = (props) => {
  return (
    <div
      className={`${cl.modalOverlay} ${props.overlay}`}
      onClick={props.onClick}
    >
      <div className={`${cl.modal}  ${props.className}`}>{props.children}</div>
    </div>
  );
};
