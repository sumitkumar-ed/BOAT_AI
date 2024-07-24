import React, { useState } from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import PastConversations from "../PastConversations/PastConversations";
import "./Home.css";
import "@fontsource/ubuntu";

const Home = () => {
  const [view, setView] = useState("chat");
  const [conversations, setConversations] = useState([]);
  const [filter, setFilter] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleNewChat = () => setView("chat");
  const handleViewPastConversations = () => setView("past");
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const closeSidebar = () => setSidebarVisible(false);

  return (
    <div className={`home ${sidebarVisible ? "blurred" : ""}`}>
      <Header onToggleSidebar={toggleSidebar} />
      <SideBar
        isVisible={sidebarVisible}
        onNewChat={handleNewChat}
        onViewPastConversations={handleViewPastConversations}
        onClose={closeSidebar}
      />
      <div className="main">
        {view === "chat" && (
          <ChatWindow
            conversations={conversations}
            setConversations={setConversations}
          />
        )}
        {view === "past" && (
          <PastConversations
            conversations={conversations}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
