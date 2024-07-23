const LOCAL_STORAGE_KEY = "conversations";

// Get conversations from local storage
export const getConversations = () => {
  const conversations = localStorage.getItem(LOCAL_STORAGE_KEY);
  return conversations ? JSON.parse(conversations) : [];
};

// Save conversations to local storage
export const saveConversations = (conversations) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversations));
};

// Add a new conversation to local storage
export const addConversation = (newConversation) => {
  const conversations = getConversations();
  conversations.push(newConversation);
  saveConversations(conversations);
};

// Update an existing conversation in local storage
export const updateConversation = (index, updatedConversation) => {
  const conversations = getConversations();
  conversations[index] = updatedConversation;
  saveConversations(conversations);
};

// Filter conversations by rating from local storage
export const filterConversationsByRating = (rating) => {
  const conversations = getConversations();
  if (!rating) return conversations;
  return conversations.filter((conv) => conv.rating === `${rating} stars`);
};
