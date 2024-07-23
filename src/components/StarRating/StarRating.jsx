import React from 'react';
import './StarRating.css';

const StarRating = ({ initialRating, onRating }) => {
    const handleStarClick = (star) => {
        if (onRating) {
            onRating(star);
        }
    };

    const renderStars = (currentRating) => {
        return [1, 2, 3, 4, 5].map(star => (
            <span
                key={star}
                className={`star ${star <= currentRating ? 'filled' : ''}`}
                onClick={() => handleStarClick(star)}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="stars">
            {renderStars(initialRating)}
        </div>
    );
};

export default StarRating;
