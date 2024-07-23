import React from "react";
import "./SideBar.css";
import { FaEdit } from "react-icons/fa";
import CloseIcon from "../../assets/close.svg";
import GptIcon from "../../assets/gpt.svg";

const SideBar = ({
  isVisible,
  onNewChat,
  onViewPastConversations,
  onClose,
}) => {
  return (
    <div className={`sidebar ${isVisible ? "active" : ""}`}>
      <img
        src={CloseIcon}
        alt="Close"
        className="close-icon"
        onClick={onClose}
      />
      {/* <button onClick={onNewChat}>New Chat</button> */}
      <div className="sidebar-header">
        <img src={GptIcon} alt="gpt" className="gpt-icon" />
        <p>New Chat</p>
        <FaEdit className="edit-icon" onClick={onNewChat} />
      </div>
      <button onClick={onViewPastConversations}>Past Conversations</button>
    </div>
  );
};

export default SideBar;
