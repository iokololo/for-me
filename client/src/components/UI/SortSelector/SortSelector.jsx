import React, {useState} from "react";
import cl from "./SortSelector.module.css";
import {Icon} from "../Icon/Icon.jsx";
import {Modal} from "../Modal/Modal.jsx";

export const SortSelector = ({ currentSort, onSortChange }) => {
  const options = [
    { value: "priceAscending", label: "Ascending price" },
    { value: "priceDescending", label: "priceDescending" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cl.sortSelector} onClick={() => setIsOpen(!isOpen)}>
      <div className={cl.select}>
        <div className={cl.sortIcon}>
          {isOpen ? <Icon name="blueSort" /> : <Icon name="sort" />}
        </div>
        <div className={cl.sortText}>
          <div className={`${cl.sortByText} ${isOpen ? cl.blueText : cl.blackText}`}>
            Сортировать по:&nbsp;
          </div>
          <div className={`${cl.sortOptionText} ${isOpen ? cl.blueText : cl.blackText}`}>
            {selectedOption.label}
          </div>
        </div>
        <div className={cl.arrow}>
          <Icon name="arrowDown" />
        </div>
      </div>
      {isOpen && (
          <div className={cl.options}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${cl.option} ${cl.sortOptionText} ${option.value === currentSort ? cl.active : ""} ${cl.blackText}`}
                onClick={() => {
                  setSelectedOption(option);
                  onSortChange(option.value);
                  setIsOpen(false);
                }
              }>
                {option.label}
              </div>
            ))}
          </div>
      )}
    </div>
  );
}