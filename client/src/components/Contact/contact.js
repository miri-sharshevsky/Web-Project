import React, { useState } from "react";
import "./contact.css";
import Chat from "./Chat/chat";
import ContactDetailes from "./ContactDetailes/contactDetailes";

export default function Contact() {
  const [OpenChat, setOpenChat] = useState(false);

  return (
    <>
      {!OpenChat && (
        <div className="contact-contaner">
          <ContactDetailes setOpenChat={setOpenChat} />
          <div className="openChat" onClick={() => setOpenChat(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5vw"
              height="5vw"
              fill="currentColor"
              class="bi bi-chat-left-text-fill"
              viewBox="0 0 16 16"
              color="#f3cb16"
            >
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
            </svg>
          </div>
        </div>
      )}
      {OpenChat && (
        <>
          <div className="contact-chat">
            <p>פנה אלינו בצאט ונענה לך פה בהקדם</p>
            <Chat className="contct-chat" />
          </div>
          <div className="openChat" onClick={() => setOpenChat(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5vw"
              height="5vw"
              fill="currentColor"
              class="bi bi-chat-right-text-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
            </svg>
          </div>
        </>
      )}
    </>
  );
}
