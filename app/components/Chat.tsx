"use client";

import Message from "./Message";

// @ts-ignore
const Chat = ({ messages }) => {
  console.log("mes boss??", messages);
  return (
    <div className="flex-1 chatHistory">
      {messages?.map((message, index) => {
        console.log("message here!!", message);
        return (
          <Message
            key={index}
            message={message?.text}
            isGpt={index % 2 ? false : true}
          />
        );
      })}
    </div>
  );
};

export default Chat;
