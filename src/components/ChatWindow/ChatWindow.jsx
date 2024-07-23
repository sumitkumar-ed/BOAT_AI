import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import staticData from "../../backend/staticData";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import StarRating from "../StarRating/StarRating";
import {
  addConversation,
  updateConversation,
  getConversations,
} from "../../backend/api";
import "./ChatWindow.css";
import BrandIcon from "../../assets/brand.svg";
import UserIcon from "../../assets/user.svg";
import GptIcon from "../../assets/gpt.svg";

const ChatWindow = ({ setConversations }) => {
  const [input, setInput] = useState("");
  const [localConversations, setLocalConversations] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackTarget, setFeedbackTarget] = useState(null);
  const [feedbackType, setFeedbackType] = useState("");
  const [typingResponse, setTypingResponse] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [ratingIndex, setRatingIndex] = useState(null);

  useEffect(() => {
    const conversations = getConversations();
    setLocalConversations(conversations);
    setConversations(conversations);
  }, [setConversations]);

  useEffect(() => {
    if (currentIndex >= 0) {
      const response = localConversations[currentIndex]?.response || "";
      if (typingResponse.length < response.length) {
        const timer = setTimeout(() => {
          setTypingResponse(response.slice(0, typingResponse.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [typingResponse, currentIndex]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true // Ensures the time is in 12-hour format with AM/PM
    });
  };

  const handleAsk = () => {
    const requestTime = getCurrentTime();
    const response = staticData.find((item) =>
      item.question.toLowerCase().includes(input.toLowerCase())
    );
    const responseTime = getCurrentTime();
    const newConversation = {
      question: input,
      response: response?.response || "No response found",
      rating: 0,
      feedback: "",
      requestTime: requestTime, // Add request time
      responseTime: responseTime, // Add response time
    };
    addConversation(newConversation);
    const updatedConversations = getConversations();
    setLocalConversations(updatedConversations);
    setConversations(updatedConversations);
    setInput("");
    setTypingResponse("");
    setCurrentIndex(updatedConversations.length - 1);
    setRatingIndex(null);
  };

  const handleFeedback = (index) => {
    setFeedbackTarget(index);
    setShowFeedbackModal(true);
  };

  const submitFeedback = (feedback) => {
    const conversations = getConversations();
    const updatedConversation = {
      ...conversations[feedbackTarget],
      feedback: feedback,
    };
    updateConversation(feedbackTarget, updatedConversation);
    const updatedConversations = getConversations();
    setLocalConversations(updatedConversations);
    setConversations(updatedConversations);
    setShowFeedbackModal(false);
  };

  const handleRating = (index, rating) => {
    const conversations = getConversations();
    const updatedConversation = { ...conversations[index], rating: rating };
    updateConversation(index, updatedConversation);
    const updatedConversations = getConversations();
    setLocalConversations(updatedConversations);
    setConversations(updatedConversations);
    setRatingIndex(null);
  };

  return (
    <div className="chat-window">
      <div className="brand-img-div">
        <img src={BrandIcon} alt="Brand" className="brand-icon-chat" />
      </div>
      <div className="chat-body">
        {localConversations.map((conv, index) => (
          <div key={index} className="chat-response">
            <div className="request">
              <div className="request-body">
                <img src={GptIcon} alt="Gpt" />
                <div>
                  <p>
                    <strong>You</strong>
                  </p>
                  {conv.question}
                  <p className="time">{conv.requestTime}</p>
                </div>
              </div>
            </div>

            <div className="response">
              <div className="response-body">
                <img src={UserIcon} alt="User" />
                <div>
                  <p>
                    <strong>Bot AI</strong>{" "}
                  </p>
                  <div>
                    {index === currentIndex ? typingResponse : conv.response}
                  </div>
                </div>
              </div>
              <div className="feedback">
                <div className="feedback-button">
                  <p className="time">{conv.responseTime}</p>
                  <div>
                    <FaThumbsUp
                      className={`icon ${
                        conv.rating > 0 ? "filled" : "outline"
                      }`}
                      onClick={() => setRatingIndex(index)}
                    />
                    <FaThumbsDown
                      className={`icon ${conv.feedback ? "filled" : "outline"}`}
                      onClick={() => handleFeedback(index)}
                    />
                  </div>
                </div>
                <div className="feedback-result">
                  {index === ratingIndex && (
                    <StarRating
                      initialRating={conv.rating}
                      onRating={(rating) => handleRating(index, rating)}
                    />
                  )}
                  {conv.rating > 0 ? (
                    <div className="stars">
                      <StarRating
                        initialRating={conv.rating}
                        onRating={() => {}}
                      />
                    </div>
                  ) : (
                    <p></p>
                  )}
                  {conv.feedback.length > 0 && <p>Feedback: {conv.feedback}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={handleAsk}>Ask</button>
        <button>Save</button>
      </div>
      {showFeedbackModal && (
        <FeedbackModal
          onSubmit={submitFeedback}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default ChatWindow;
