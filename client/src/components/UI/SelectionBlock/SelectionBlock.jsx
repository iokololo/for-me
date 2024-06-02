import React from 'react';
import cl from './SelectionBlock.module.css';
import {Icon} from "../Icon/Icon.jsx";

export const SelectionBlock = ({ title, children, isChecked }) => {
  const [isExpanded, setIsExpanded] = React.useState(isChecked || false);
  return (
    <div className={`${cl.block} ${isExpanded ? cl.expanded : ""}`}>
      <div className={`${cl.top} ${isExpanded ? cl.expanded : ""}`} onClick={()=>setIsExpanded(!isExpanded)}>
        <div className={cl.title}>{title}</div>
        <div className={`${cl.arrow} ${isExpanded ? cl.rotated : ""}`}>
          <Icon name='arrowDown' />
        </div>
      </div>
        {isExpanded &&
          <div className={cl.content}>
            {children}
          </div>
        }
    </div>
  )
}