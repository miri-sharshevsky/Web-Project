import React from "react";
import { AiFillPhone } from "react-icons/ai";
import { FaCity, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BranchDetailes({ city, street, phoneNumber, maneger }) {
  return (
    <Link to="/Restaurant" className="b">
      <div className="branch">
        <div className="detailsbranch">
          <p className="detailes-icon">
            <FaCity />
          </p>

          {city}
        </div>
        <div className="detailsbranch">
          <p className="detailes-icon">
            <FaMapMarkerAlt />
          </p>
          {street}
        </div>

        <div className="detailsbranch">
          <p className="detailes-icon">
            <AiFillPhone />
          </p>

          {phoneNumber}
        </div>
        <div className="detailsbranch">
          <p className="detailes-icon">
            <FaUser />
          </p>
          {maneger}
        </div>
      </div>
    </Link>
  );
}
