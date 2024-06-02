import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import cl from "./Tooltip.module.css";
export const Tooltip = ({ text }) => {
  return (
    <div className={cl.bg}>
      <div className={cl.icon}>
        <Icon name='info' />
      </div>
      {/* <div className={cl.text}>
        <div className={cl.title}>{text}</div>
      </div> */}
    </div>
  );
};
