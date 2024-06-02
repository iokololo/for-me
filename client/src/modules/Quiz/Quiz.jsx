import React from "react";
import cl from "./Quiz.module.css";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/UI/Button/Button.jsx";

export const Quiz = () => {
  const { t } = useTranslation();
  const btnHandler = () => {
    window.location.reload();
  };
  const [selectedIds, setSelectedIds] = React.useState([]);
  const data = [
    {
      id: 1,
      text: "Anime",
    },
    {
      id: 2,
      text: "Sport",
    },
    {
      id: 3,
      text: "TVShows",
    },
    {
      id: 4,
      text: "Computer",
    },
    {
      id: 5,
      text: "Innovation",
    },
    {
      id: 6,
      text: "Phd and Science",
    },
  ];
  const handleButtonClick = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  return (
    <div>
      <div className={cl.quiz}>
        <div className='quizItems'>
          <div className={cl.formTitle}>{t("auth.register.quiz.title")}</div>
          <div className={cl.quizOption}>
            {data.map((item) => (
              <Button
                key={item.id}
                className={`${cl.quizButton} ${
                  selectedIds.includes(item.id) && cl.selectedButton
                }`}
                onClick={() => handleButtonClick(item.id)}
              >
                {item.text}
              </Button>
            ))}
          </div>
        </div>
        <div className={cl.buttons}>
          <Button className={`${cl.btn} ${cl.btnTop}`} onClick={btnHandler}>
            Продолжить
          </Button>
          <Button className={`${cl.btn} ${cl.btnBottom}`} onClick={btnHandler}>
            Пропустить
          </Button>
        </div>
      </div>
    </div>
  );
};
