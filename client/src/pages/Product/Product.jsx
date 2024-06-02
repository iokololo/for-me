import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductService from "../../service/ProductService";
import cl from "./Product.module.css";

import Skeleton from "react-loading-skeleton";
import { ImageGallery } from "../../modules/ImageGallery/ImageGallery.jsx";
import { maskToPrice } from "../../utils/mask.js";
import { Button } from "../../components/UI/Button/Button.jsx";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { QuestionBlock } from "../../components/UI/QuestionBlock/QuestionBlock.jsx";
import { Tooltip } from "../../components/UI/Tooltip/Tooltip.jsx";
import { Breadcrumbs } from "../../components/UI/Breadcrumbs/Breadcrumbs.jsx";
import ReviewItem from './ReviewItem';
import Pagination from './Pagination';
import ReviewService from "../../service/ReviewService.js";
import StarRating from './StarRating';

export const Product = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth);
  const [property, setProduct] = useState(null);
  const [author, setAuthor] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [courseRating, setCourseRating] = useState(0);
  const [starRating, setStarRating] = useState(0);
  const navigate = useNavigate();

  const [descriptions, setDescriptions] = useState([]);

  const { id } = useParams();

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const totalPages = Math.ceil(reviews.length / 10);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleReviewSubmit = async () => {
    const reviews = await ReviewService.createReview(id, starRating, reviewText)
    console.log("Review Submitted:", reviewText);
    setReviewText('');
    setStarRating(0); 
    setReviews(reviews ?? [])
  };

  const descriptionsArray = descriptions.map((descriptionInfo, index) => (
    <div key={index} className={cl.descriptionItem}>
      <div className={cl.top}>
        <div className={cl.title}>
          {
            descriptionInfo.title[
              i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
            ]
          }
        </div>
        <div className={cl.infoIcon}>
          <Tooltip />
        </div>
      </div>
      <div className={cl.descText}>
        {
          descriptionInfo.value[
            i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
          ]
        }
      </div>
    </div>
  ));

  const handleReserveButtonClick = () => {
    console.log("Product page. Product Id: ", property?._id)
    if (property?.type === "Books") {
      window.open(property.book_url, '_blank');
    } else {
      navigate(`/payment/${property?._id}`);
    }
  };

  const handleAuthorEmblemClick = () => {
      navigate(`/teachers/${author?._id}`);
  };

  const favoriteHandler = async () => {
    if (!user || !user?.isAuth) {
      return navigate("/login");
    }

    if (user?.userData?.favorites?.items?.includes(id)) {
      await ProductService.removeFavorite(id);
    } else {
      await ProductService.addFavorite(id);
    }
    window.location.reload();
  };

  const loadData = async () => {
    console.log("Product Page. Product Id: ", id)
    const property = await ProductService.getProduct(id).then(async (res) => {

      console.log("Product Page. Author: ", res?.data?.author)
      const author = await ProductService.getDeveloper(
        res?.data?.author || res?.data?.author
      );
      const reviews = await ReviewService.getProductReviews(id);
      setReviews(reviews.data)
      setAuthor(author?.data);
      if(res?.data?.rating){
        setCourseRating(res?.data?.rating);
      }
      return res;
    });

    setProduct(property.data);


    setQuestionData(property?.data?.lessons);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='wrapper'>
      <Breadcrumbs
        path={["property"]}
        name={[
          property?.title[
            i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
          ],
        ]}
      />
      <ImageGallery images={property?.images} id={id} video={property?.video} />
      <div className={cl.pageContent}>
        <div className={cl.pageLeft}>

          <div className={cl.card}>
            <div className={cl.leftSide}>
              <div className={cl.cardTitle}>
                {property ? (
                  property.title[
                    i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                  ]
                ) : (
                  <Skeleton width={200} />
                )}
              </div>
              <div className={cl.subtitle}>
                <div className={cl.subtitleLeft}>
                  <div className={cl.type}>{t("property.type")}</div>
                  <div className={cl.valueLeft}>
                    {property?.type}
                  </div>
                </div>
                <div className={cl.subtitleRight}>
                  <div className={cl.type}>{t("property.cost")}</div>
                  <div className={cl.valueRight}>
                    {property ? (
                      `${maskToPrice(property.price)}`
                    ) : (
                      <Skeleton width={150} />
                    )}
                  </div>
                </div>
              </div>
              <div className={cl.subtitle}>
                <div className={cl.subtitleLeft}>
                  <div className={cl.type}>{ "Rating "}</div>
                  <div className={cl.valueLeft}>
                    {property ? (
                      `${courseRating} / 5`
                    ) : (
                      <Skeleton width={150} />
                    )}
                  </div>
                </div>
              </div>
              <div className={cl.emblem}  onClick={handleAuthorEmblemClick}>
                <div className={cl.emblemIcon}>
                {author && author.profilePicture ? (
                  <img src={author.profilePicture} alt={author.name} className={cl.authorImage} />
                ) : (
                  <Icon name='emblem' />
                )}
                </div>
                <div className={cl.emblemText}>
                  {author ? (
                    `${author.name}`
                  ) : (
                    <Skeleton width={100} />
                  )}
                </div>
              </div>
            </div>
            <div className={cl.rightSide}>
              <div className={cl.favorite} onClick={favoriteHandler}>
                <div className={cl.favIcon}>
                  {user?.userData?.favorites?.items?.includes(id) ? (
                    <Icon name={"favoriteFilled"} />
                  ) : (
                    <Icon name={"favorite"} />
                  )}
                </div>
                <div className={cl.favText}>
                  {user?.userData?.favorites?.items?.includes(id) ? (
                    <>{t("property.saved")}</>
                  ) : (
                    <>{t("property.favorite")}</>
                  )}
                </div>
              </div>
              <Button
                className={cl.button}
                onClick={handleReserveButtonClick}
                type='fill'
                disabled={property?.isBought}
              >
                {
                 property?.isBought 
                 ? "Item Purchased" 
                 : property?.type === "Books"
                   ? "Download a book"
                   : "Buy a course"}
              </Button>
            </div>
          </div>
          <div className={cl.secondCard}>
  
            <div className={cl.description}>
              <div className={cl.descriptionContainer}>{descriptionsArray}</div>
            </div>
            <div className={cl.aboutDev}>
              <div className={cl.aboutDevTop}>
                <div className={cl.buildingIcon}>
                  <Icon name='building' />
                </div>
                <div className={cl.aboutDevTitle}>{t("property.aboutDev")}</div>
              </div>
              <div className={cl.aboutDevText}>
                <div className={cl.rank}>
                  <div className={cl.rankTitle}>{t("property.rank")}</div>
                  <div className={cl.rankValue}>
                    {author ? author?.experience : <Skeleton width={100} />}
                  </div>
                </div>
                <div className={cl.solvency}>
                  <div className={cl.solvencyTitle}>
                    {t("property.solvency")}
                  </div>
                  <div className={cl.solvencyValue}>
                    {author ? (
                      author?.hourlyRate
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={cl.QuestionBlocks}>
              {questionData.map((question, index) => (
                <QuestionBlock
                  key={index}
                  title={question.title}
                  content={
                    question.text
                  }
                  video_url={question.video_url}
                  count={index + 1}
                  border={cl.border}
                  active={cl.activeQuestionBlock}
                  flatIcon={false}
                  answer={cl.content}
                  lastBlock={index === 5 && true}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={cl.pageRight}>
        </div>
      </div>

      <div className={cl.reviewContainer}>
        {reviews.slice((currentPage - 1) * 10, currentPage * 10).map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      {
      !property?.isReviewed  && ( 
        <div>
          <StarRating rating={starRating} setRating={setStarRating} />
          <textarea
            className={cl.textArea}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '8px' }}
          ></textarea>
          <button
            className={cl.submitButton}
            onClick={handleReviewSubmit}
            disabled={!reviewText.trim()}
          >
            Submit Review
          </button>
        </div>
      )
    }
    </div>
  );
};
