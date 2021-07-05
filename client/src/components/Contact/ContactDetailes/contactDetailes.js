import React from "react";

export default function ({ setOpenChat }) {
  return (
    <>
      <div className="contact-detailes">
        <p className="contact-text-title">שעות פתיחת הסניפים:</p>
        <p className="contact-taxt">
          ימים ראשון עד חמישי :
          <br />
          10:00 בבוקר עד 24:00 בלילה
          <br />
          ימי שישי וערבי חג מ 10:00 בבוקר עד 12:30 בצהריים
          <br />
          הסניפים סגורים בשבתות וחגי ישראל
        </p>
        <p className="contact-text-title">שעות פעליות האתר:</p>
        <p className="contact-text">כל שעות היממה מלבד שבתות וחגי ישראל</p>
      </div>
      <div className="contact-detailes">
        <p className="contact-text-title">צור קשר</p>
        <p className="contact-taxt">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.9vw"
            height="2.9vw"
            fill="currentColor"
            class="bi bi-telephone-forward-fill"
            viewBox="0 0 16 16"
            color="#f3cb16"
          >
            <path
              fill-rule="evenodd"
              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z"
            />
          </svg>
          <br />
          0583272883
          <br />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.9vw"
            height="2.9vw"
            fill="currentColor"
            class="bi bi-envelope-fill"
            viewBox="0 0 16 16"
            color="#f3cb16"
          >
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
          </svg>
          <br />
          TakeEat100@gmail.com <br />
          <div className="contact-openChat" onClick={() => setOpenChat(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.9vw"
              height="2.9vw"
              fill="currentColor"
              class="bi bi-chat-fill"
              viewBox="0 0 16 16"
              color="#f3cb16"
            >
              <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
            </svg>
            <br />
            בצאט ונענה לך
          </div>
        </p>
      </div>
    </>
  );
}
