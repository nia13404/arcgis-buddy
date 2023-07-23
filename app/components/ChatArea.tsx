"use client";

import { useState } from "react";

import Chat from "./Chat";
import ChatInput from "./ChatInput";

import { addData, getDatabase } from "../database";

function ChatArea({ chatId = "1" }) {
  const data = getDatabase().find(({ chatId: id }) => chatId == id)?.chatList;
  const [messages, setMessages] = useState([data]);

  // @ts-ignore
  const updateMessages = (message) => {
    addData({ chatId, message });
    const updatedData = getDatabase().find(
      ({ chatId: id }) => chatId == id
    )?.chatList;
    const newData = updatedData.slice();
    setMessages(newData);
  };

  return (
    <div className="chatArea">
      <h1 className="chatTitle">Welcome to GIS</h1>
      <Chat messages={messages} />
      <ChatInput chatId={chatId} updateMessages={updateMessages} />
    </div>
  );
}

export default ChatArea;
