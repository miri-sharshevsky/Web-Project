import React from "react";
import "./aboutUs.css";
import logo from "../../asset/imgs/logo.png";

export default function AboutUs() {
  return (
    <div className="aboutUs-contaner">
      <p className="aboutUs-text title">מי אנחנו? מה אנחנו?</p>
      <p className="aboutUs-text">
        כל מה שאתם רוצים זה לאכול אוכל טעים, בכל זמן שתרצו והעיקר שיגיע מהר,
        נכון? אז תכירו את טייק איט- קליק אחד ואפשר לראות את כל הסניפים הקרובים
        אליכם מתוך עשרות הסניפים שלנו הפרוסים ברחבי הארץ.יש לנו המון מבצעים
        והנחות והתשלום פשוט וקל.
      </p>
      להזמין מהטלפון זה הכי שנות ה-90! בעזרת האתר ניתן להזמין מנה על פי המלצות
      גולשים שנהנו כבר אצלנו. מעל 20 שנות ניסיון לימדו אותנו ששירות מצוין הוא
      הבסיס לכל הפעילות שלנו, לכן אנו משקיעים ומעמידים לרשותכם צוות עובדים
      מקצועי שיעשה הכל כדי שתהיו לקוחות שמחים ושבעים!
      <p className="aboutUs-text">
        {" "}
        יש לנו מוקד שירות הפועל בטלפוןובאתר , ואזור ניהול עצמי של החשבון הכולל
        שמירת סל הקניות, צפיה במצב ההזמנה ובהזמנות קודמות ועוד ! אז בכל מקום בו
        תהיו, קחו את שבא לכם, בתאבון!
      </p>
      <p className="aboutUs-text">
        החזון שלנו החיים מתובלים במנות גדושות של כיף וקיימות דרכים רבות ליהנות.
        אנחנו בחרנו להתמקד בעולמות הקולינריה, כי אין כמו לקבל משלוח של מאכל
        אהוב, להתענג על הריחות והטעמים שלו, עם תחושת ההנאה שבלאכול מה שבא לנו,
        מבלי להתאמץ.לכן המשימה ברורה: לעשות הכל כדי שתיהנו מאוכל מעולה במינימום
        מאמץ, מתי שבא לכם!
      </p>
      <p className="aboutUs-text">איפה אנחנו? משרדינו רחוב ירמיהו 24 ירולשים</p>
    </div>
  );
}