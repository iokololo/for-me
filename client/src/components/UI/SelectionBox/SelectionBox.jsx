import React from 'react';
import cl from './SelectionBox.module.css';

export const SelectionBox = ({ id, title, value, isChecked, onCheckboxChange }) => {
  return (
    <div className={cl.selectionBox}>
      <div className={cl.selection}>
        <div className={cl.leftSelection}>
          <label className={cl.box} htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              className={cl.chb}
              checked={isChecked}
              onChange={onCheckboxChange}
            />
            <span className={cl.checkmark}></span>
          </label>
          <div className={cl.selectionTitle}>{title}</div>
        </div>
        <div className={cl.rightSelection}>
          <div className={cl.selectionValue}>{value}</div>
        </div>
      </div>
    </div>
  )
}