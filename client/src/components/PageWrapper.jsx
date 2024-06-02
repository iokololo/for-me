import { useNavigate } from "react-router-dom";
import { Footer } from "../modules/Footer/Footer";
import { Navbar } from "../modules/Navbar/Navbar";
import { ScrollTop } from "./ScrollTop";
import { FloatingButton } from "./UI/FloatingButton/FloatingButton";
import { Modal } from "./UI/Modal/Modal";
import { Button } from "./UI/Button/Button";
import { useState } from "react";
import tg from "../assets/images/tg.png";
import { Icon } from "./UI/Icon/Icon.jsx";
import { useTranslation } from "react-i18next";
export const PageWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const tgHandler = () => {
    setIsModalOpen(false);
    window.open("https://t.me/inlotKzBot");
  };

  return (
    <div className='main'>
      <div className={"floatingButton"}>
        <div onClick={() => navigate("/faq")}>
          <FloatingButton />
        </div>
      </div>
      <div className={"floatingButton2"}>
        <div onClick={() => setIsModalOpen(true)}>
          <FloatingButton chat={true} />
        </div>
      </div>
      <ScrollTop />
      <nav className='nav'>
        <Navbar />
      </nav>
      {children} {/* Render the passed children here */}
      <Footer />
      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)} className='modalTG'>
          <div className='modalWrapper' onClick={(e) => e.stopPropagation()}>
            <div className='modalTop'>
              <div className='modalTitle'>{t("chatModal.title")}</div>
              <div className='modalClose' onClick={() => setIsModalOpen(false)}>
                <Icon name='close' />
              </div>
            </div>
            <div className='modalImg'>
              <img src={tg} alt='telegram' />
            </div>
            <div className='modalSubtitle'>{t("chatModal.placeholder")}</div>
            <Button className={"modalButton"} onClick={tgHandler}>
              {t("chatModal.send")}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};