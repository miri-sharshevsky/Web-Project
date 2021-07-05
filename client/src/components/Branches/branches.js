import React, { useState, useEffect } from "react";
import "./branches.css";
import { getBranches } from "../../Service/branches.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { getCloseBrunches } from "../../Service/branches.js";
import BranchDetailes from "./BranchDetailes/branchDetailes";

export default function Branches() {
  const [allBranches, setAllBranches] = useState([]);
  const [Branches, setBranches] = useState([]);
  const [searching, setSearching] = useState(false);
  const [cityForSearch, setCityForSearch] = useState("בחירת סניף");
  const [userAddrees, setuserAddrees] = useState(null);
  const [search, setsearch] = useState(false);
  const [changes, setChanges] = useState(false);

  const cityes = [
    "ירושלים",
    "בני ברק",
    "בית שמש",
    "חיפה",
    "תל אביב",
    "רמת גן",
    "הרצלריה",
    "צפת",
    "לוד",
    "טבריה",
    "רכסים",
    "ערד",
    "ביתר",
    "אשקלון",
    "נתיבות",
    "באר שבע",
    "ראשון לציון",
    "חולוון",
    "אלעד",
    "בת ים",
    "פתח תקוה",
    "כפר סבא",
    "נתניה",
    "חדרה",
    "נצרת",
    "אילת",
    "כרמיאל",
    "עפולה",
    "קרית גת",
    "מעלה אדומים",
    "גבעת זאב",
  ];

  useEffect(async () => {
    let details = await getBranches();
    setBranches(details);
    setAllBranches(details);
  }, []);

  const getUserLocatin = (e) => {
    setuserAddrees(e.target.value);
  };

  const searchBranches = async () => {
    setChanges(!changes);
    setsearch(true);
  };

  const searchInBranches = async () => {
    setChanges(!changes);
    setSearching(true);
    let searchBranches = [];
    searchBranches = await getCloseBrunches({ address: userAddrees });
    setBranches(searchBranches);
    setSearching(false);
  };
  const lookForCity = (event) => {
    setCityForSearch(event.target.value);
    setBranches(allBranches);
  };

  return (
    <p className="branches-contaner">
      {searching && (
        <p className="louding-icon">
          <FontAwesomeIcon
            icon={faUtensils}
            spin
            size="100px"
            className="louding"
          />
        </p>
      )}

      {!searching && (
        <div>
          {" "}
          <div className="branches-searchAll">
            <div className="branches-search">
              <p className="searchForCity">חיפוש סניף לפי עיר:</p>
              <select className="branches-chooseCity" onChange={lookForCity}>
                <option selected>בחירת סניף</option>
                {cityes.map((city) => {
                  return <option>{city}</option>;
                })}
              </select>
            </div>

            <button className="searchForCloseCity" onClick={searchBranches}>
              מציאת הסניפים הקרובים אליך
            </button>
          </div>
          <div>
            <div>
              {search && (
                <>
                  <input
                    type="text"
                    name="userAddress"
                    value={userAddrees}
                    onChange={getUserLocatin}
                    placeholder="הכנס את הכתובת שלך"
                  />
                  <button onClick={searchInBranches}>חיפוש</button>
                </>
              )}
              <div className="branches-title">
                <p className="branches-title-text">עיר</p>
                <p className="branches-title-text">כתובת</p>
                <p className="branches-title-text">טלפון</p>
                <p className="branches-title-text">מנהל הסניף</p>
              </div>

              {cityForSearch !== "בחירת סניף" &&
                allBranches
                  .filter((branch) => {
                    return (
                      branch.city === cityForSearch && Branches.includes(branch)
                    );
                  })
                  .map((item) => {
                    return (
                      <BranchDetailes
                        city={item.city}
                        street={item.street}
                        phoneNumber={item.phoneNumber}
                        maneger={item.manger}
                      />
                    );
                  })}
              {cityForSearch === "בחירת סניף" &&
                Branches.map((item) => {
                  return (
                    <BranchDetailes
                      city={item.city}
                      street={item.street}
                      phoneNumber={item.phoneNumber}
                      maneger={item.manger}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </p>
  );
}
