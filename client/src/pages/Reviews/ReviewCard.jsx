import React from 'react';
import cl from './Reviews.module.css'; 

const ReviewCard = ({ review }) => {
    return (
        <div className={cl.card}>
            <img src={review.authorPicture} alt={review.authorName} className={cl.authorImage} />
            <div className={cl.content}>
                <h3 className={cl.title}>{review.title}</h3>
                <p className={cl.description}>{review.description}</p>
                <p className={cl.authorName}>{review.authorName}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
