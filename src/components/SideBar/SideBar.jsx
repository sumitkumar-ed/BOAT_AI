import React from "react";
import "./SideBar.css";
import CloseIcon from "../../assets/close.svg";

const SideBar = ({ isVisible, onNewChat, onViewPastConversations, onClose }) => {
  return (
    <div className={`sidebar ${isVisible ? "active" : ""}`}>
      <img src={CloseIcon} alt="Close" className="close-icon" onClick={onClose} />
      <button onClick={onNewChat}>New Chat</button>
      <button onClick={onViewPastConversations}>Past Conversations</button>
    </div>
  );
};

export default SideBar;
