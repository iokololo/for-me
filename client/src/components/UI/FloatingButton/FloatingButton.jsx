import React from "react";
import cl from "./FloatingButton.module.css";
import { Icon } from "../Icon/Icon";

export const FloatingButton = ({ chat }) => {
  if (chat) {
    return (
      <div className={cl.button}>
        <Icon name="chat" />
      </div>
    );
  }
  return <div className={cl.button}>?</div>;
};
