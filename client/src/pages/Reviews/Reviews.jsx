import React from 'react';
import ReviewCard from './ReviewCard';
import cl from './Reviews.module.css';  

const reviewsData = [
    {
        id: 1,
        title: "Excellent Product",
        description: "This product has exceeded my expectations.",
        authorName: "Jane Doe",
        authorPicture: "https://media.istockphoto.com/id/1389669994/photo/ai-metaverse-and-facial-recognition-technology.jpg?s=612x612&w=0&k=20&c=ax0ZStMZl5cYOnl_MddCHijTjOd_DW68QIRcTGkGPkM="
    },
    {
        id: 2,
        title: "Not worth it",
        description: "I had higher expectations based on the reviews.",
        authorName: "John Smith",
        authorPicture: "https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=w8SlKv-4u6xYyU07CXeBRvfW6F0iYx-a7HR2ChM8ZbU="
    }
];

export const Reviews = () => {

    return (
        <div className='wrapper'>
        <div className={cl.reviewsContainer}>
            {reviewsData.map(review => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
        </div>
    );
};
