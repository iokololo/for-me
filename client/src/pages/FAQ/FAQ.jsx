import React, { useEffect, useState } from "react";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useTranslation } from "react-i18next";
import { QuestionBlock } from "../../components/UI/QuestionBlock/QuestionBlock.jsx";
import { Breadcrumbs } from "../../components/UI/Breadcrumbs/Breadcrumbs.jsx";
import cl from "./FAQ.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export const FAQ = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubTitleIndex, setSelectedSubTitleIndex] = useState(1);
  const [findedQuestions, setFindedQuestions] = useState([]);
  const navigate = useNavigate();
  // get translation json
  const translation = t("faq", { returnObjects: true });

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length === 0 && location.state !== null) {
      navigate("/faq");
    }
  };
  const handleSubTitleClick = (index) => {
    setSelectedSubTitleIndex(index);
  };

  const findQuestions = () => {
    const findedQuestions = [];
    const questions = translation.question;
    const answers = translation.answer;

    if (searchValue.length === 0) return setIsModalOpen(false);
    setIsModalOpen(true);

    for (let questionBlock in questions) {
      for (let question in questions[questionBlock]) {
        if (
          questions[questionBlock][question]
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          findedQuestions.push({
            question: questions[questionBlock][question],
            answer: answers[questionBlock][question],
          });
        }
      }
    }
    setFindedQuestions(findedQuestions);
  };

  useEffect(() => {
    findQuestions();
  }, [searchValue]);

  return (
    <div className={cl.root}>
      <header className={cl.header}>
        <div className='wrapper'>
          <Breadcrumbs path={["faq"]} name={[`${t("path.faq.title")}`]} />
          <div className={cl.title}>{t("faq.title")}</div>
          <div className={cl.searchView}>
            <div className={cl.searchWrapper}>
              <div className={cl.search}>
                <div className={cl.icon}>
                  <Icon name='searchIcon' />
                </div>
                <input
                  className={cl.searchInput}
                  type='search'
                  placeholder={t("faq.search")}
                  value={searchValue}
                  onChange={handleSearch}
                />
              </div>
            </div>
            {isModalOpen && (
              <div className={cl.searchResultWrapper}>
                {findedQuestions.map(
                  (question, index) =>
                    index < 5 && (
                      <div
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate("/faq", {
                            state: {
                              question: question.question,
                              questions: findedQuestions,
                            },
                          });
                        }}
                        className={cl.searchResult}
                      >
                        <div className={cl.searchResultTitle}>
                          {question.question}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={cl.main}>
        <div className='wrapper'>
          <div className={cl.sort}>
            {location.state === null && (
              <div className={cl.subTitles}>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
                  <div
                    className={`${cl.subTitle} ${
                      selectedSubTitleIndex === index && cl.active
                    }`}
                    key={index}
                    onClick={() => handleSubTitleClick(index)}
                  >
                    <div
                      className={`${cl.button} ${
                        selectedSubTitleIndex === index
                          ? cl.highlighted
                          : cl.notHighlighted
                      }`}
                    >
                      {t(`faq.subTitle.${index}`)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div
              className={`${cl.questions} ${
                location.state !== null && cl.questionS
              }`}
            >
              {location.state === null && (
                <div className={cl.questionTitle}>
                  {t(`faq.subTitle.${selectedSubTitleIndex}`)}
                </div>
              )}
              {location.state !== null
                ? location.state.questions.map((question, index) => (
                    <QuestionBlock
                      title={question.question}
                      content={question.answer}
                      count={index + 1}
                      flatIcon={true}
                      border={cl.border}
                      active={cl.activeQuestionBlock}
                      answer={cl.content}
                    />
                  ))
                : Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
                    <QuestionBlock
                      title={t(
                        `faq.question.${selectedSubTitleIndex}.${index}`
                      )}
                      content={t(
                        `faq.answer.${selectedSubTitleIndex}.${index}`
                      )}
                      count={index}
                      flatIcon={true}
                      border={cl.border}
                      active={cl.activeQuestionBlock}
                      answer={cl.content}
                    />
                  ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
