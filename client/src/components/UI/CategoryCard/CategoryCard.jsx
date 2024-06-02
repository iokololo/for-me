import React from "react";
import cl from "./CategoryCard.module.css";

export const CategoryCard = ({ text, image, onClick }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        cursor: "pointer",
      }}
      className={cl.categoryCard}
      onClick={onClick}
    >
      <div className={cl.text}>
        <div className={`${cl.text_md} text-md`}>{text}</div>
      </div>
    </div>
  );
};
