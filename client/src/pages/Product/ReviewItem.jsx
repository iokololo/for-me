import React from 'react';
import cl from './Product.module.css';

const ReviewItem = ({ review }) => {
  const placeholderImage = "data:image/jpeg;base64,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";
  
  const imageUrl = review.userImage ? review.userImage : placeholderImage;

  return (
    <div className={cl.reviewItem}>
      <div 
        className={cl.userImage} 
        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className={cl.reviewContent}>
        <div className={cl.reviewHeader}>
          <span>{review?.user?.name || "Anonymous"}</span> 
          <span>{review.createdAt}</span>
        </div>
        <div className={cl.reviewText}>
          {'★'.repeat(review.stars)}
          {'☆'.repeat(5 - review.stars)}
        </div>
        <div>{review.text}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
