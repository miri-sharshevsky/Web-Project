import React, { useState, useEffect } from "react";
import "./chat.css";
import { getQustions, addQuestions } from "../../../Service/questions";

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [changes, setchanges] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [showError, setshowError] = useState(false);

  useEffect(async () => {
    let chatArr = await getQustions();
    setChat(chatArr.reverse());
  }, [changes]);

  const upDateResponse = (event) => {
    setNewMessage(event.target.value);
  };

  async function sendChat(e) {
    if (e.key === "Enter") {
      if (window.localStorage.user === "null") {
        setshowError(true);
        setNewMessage("");
      } else {
        if (newMessage === "") {
          return;
        }
        let newChat;
        const today = new Date();
        if (
          window.localStorage.user === "null" ||
          JSON.parse(localStorage.user).worker === undefined
        ) {
          newChat = {
            message: newMessage,
            type: "costumer",
            name: JSON.parse(localStorage.user).name,
            date:
              today.getDate() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.getFullYear(),
          };
        } else {
          newChat = {
            message: newMessage,
            type: "worker",
            name: "TakeEat",
            date:
              today.getDate() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.getFullYear(),
          };
        }
        await addQuestions(newChat);
        setNewMessage("");
        setchanges(!changes);
      }
    }
  }

  return (
    <div className="chat-contaner">
      {showError && <div> אינך נכנסת למערכת כלקוח כנס כעת </div>}
      <textarea
        onChange={upDateResponse}
        className="chat-input"
        placeholder="כתוב כאן"
        onKeyDown={sendChat}
        value={newMessage}
      ></textarea>
      <div className="chat-messages">
        {chat.map((message) => {
          if (message.type === "costumer") {
            return (
              <div className="chat-costumer">
                {message.message}
                <hr className="chat-pass" />
                <p className="chat-name">{message.name}</p>
                <p className="chat-date">{message.date}</p>
              </div>
            );
          } else {
            return (
              <div className="chat-worker">
                {message.message} <hr className="chat-pass" />
                <p className="chat-date">{message.date}</p>
                <p className="chat-name">{message.name}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
