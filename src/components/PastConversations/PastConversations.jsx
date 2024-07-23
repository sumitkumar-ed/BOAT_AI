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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today's Chat";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday's Chat";
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  };

  const groupConversationsByDate = () => {
    const grouped = conversations.reduce((acc, conv) => {
      const dateKey = formatDate(conv.createdAt);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(conv);
      return acc;
    }, {});

    // Custom sorting to ensure "Today's Chat" and "Yesterday's Chat" appear first
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      if (a === "Today's Chat") return -1;
      if (b === "Today's Chat") return 1;
      if (a === "Yesterday's Chat") return -1;
      if (b === "Yesterday's Chat") return 1;
      return new Date(b) - new Date(a);
    });

    return sortedDates.map((dateKey) => ({
      date: dateKey,
      conversations: grouped[dateKey],
    }));
  };

  const groupedConversations = groupConversationsByDate();

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
        {groupedConversations.map((group, index) => (
          <div key={index} className="conversation-group">
            <h3>{group.date}</h3>
            {group.conversations.map((conv, index) => (
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
                    </div>
                  </div>
                  <div className="feedback-result">
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
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastConversations;
