"use client";
import { FormEvent, useState } from "react";

import SendIcon from "calcite-ui-icons-react/SendIcon";
import AttachmentPlus from "calcite-ui-icons-react/AttachmentPlusIcon";

import { addData, getDatabase } from "../database";

const ChatInput = ({ chatId = "1", updateMessages }) => {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState("")

  const onFileUpload = async () => {
    console.log("onFileUpload(): " + selectedFile);
    const response = await fetch(
      "http://localhost:3001/api/upload",
      {
        method: "POST",
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/octet-stream",
        },
        body: JSON.stringify({ "files": selectedFile }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data?.output
      });
  }

  const sendMessage = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!prompt) return "";
    const input = prompt.trim();
    setPrompt("");
    if(selectedFile != ""){
      onFileUpload();
    }
    
    const message = {
      text: input,
    };
    await updateMessages(message);
    // await addData({ chatId, message });

    const response = await fetch(
      "http://localhost:3001/api.agents.tutor.agent/run",
      {
        method: "POST",
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "input": message.text, "memory": [{}] }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data?.output
      });
    await updateMessages({ text: response });
  };

  return (
    <div className="bg-gray-300/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="chatInput">
        <div className="inputContainer">
          <input 
            type="file" 
            onChange={(event) => setSelectedFile(event.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            className="bg-transparent focus:outline-none flex-1 disabled:text-gray-300"
            onChange={(event) => setPrompt(event.target.value)}
            value={prompt}
            type="text"
            placeholder="Or type your question here..."
          />
          <button
            type="submit"
            disabled={!prompt}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <SendIcon className="h-4 w-4 -rotate-45" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
