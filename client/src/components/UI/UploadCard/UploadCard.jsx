import React from "react";
import cl from "./UploadCard.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Icon } from "../Icon/Icon.jsx";
export const UploadCard = ({ card }) => {
  if (!card) {
    return (
      <SkeletonTheme>
        <Skeleton className={cl.skeleton}></Skeleton>
      </SkeletonTheme>
    );
  }
  return (
    <div className={cl.card}>
      <div className={cl.image} />
      <div className={cl.info}>
        <div className={cl.text}>{card?.title}</div>
        <div className={cl.icon}>
          <Icon name='upload' />
        </div>
      </div>
    </div>
  );
};
