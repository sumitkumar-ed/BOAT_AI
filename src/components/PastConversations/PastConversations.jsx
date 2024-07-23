import React, { useEffect, useState } from "react";
import { filterConversationsByRating } from "../../backend/api";
import "./PastConversations.css";
import GptIcon from "../../assets/gpt.svg";
import UserIcon from "../../assets/user.svg";

const PastConversations = ({ filter, setFilter }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const filteredConversations = filterConversationsByRating(filter);
    setConversations(filteredConversations);
  }, [filter]);

  const renderStars = (rating) => {
    const starCount = parseInt(rating, 10); // Convert rating to number
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= starCount ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="past-conversations">
      <div className="filter">
        <label>Filter by Rating:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} stars
            </option>
          ))}
        </select>
      </div>
      <div className="conversations">
        {conversations.map((conv, index) => (
          <div key={index} className="conversation">
            <div className="past-request">
              <div>
                <img src={UserIcon} alt="User" />
              </div>
              <div>
                <p>
                  <strong>You</strong>
                </p>
                {conv.question}
                <p className="time">{conv.requestTime}</p>
              </div>
            </div>
            <div>
              <div className="past-response">
                <div>
                  <img src={GptIcon} alt="Gpt" />
                </div>
                <div>
                  <p>
                    <strong>Bot AI</strong>
                  </p>
                  {conv.response}
                  <p className="time">{conv.responseTime}</p>
                  {conv.rating > 0 && (
                    <div className="rating">
                      <strong className="rating-text">Rating:</strong>
                      {renderStars(conv.rating)}
                    </div>
                  )}
                  {conv.feedback.length > 0 && (
                    <p>
                      <strong>Feedback:</strong>{" "}
                      {conv.feedback || "No feedback"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastConversations;
