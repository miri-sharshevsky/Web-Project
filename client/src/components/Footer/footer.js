import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div class="container-fluid pb-0 mb-0 justify-content-center text-light ">
      <footer>
        <div class="row my-5 justify-content-center py-5">
          <div class="col-11">
            <div class="row ">
              <div class="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                <h3 class="text-muted mb-md-0 mb-5 bold-text">TakeEat</h3>
              </div>
              <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                <h6 class="mb-3 mb-lg-4 bold-text ">
                  <b>קישורים מהירים</b>
                </h6>
                <ul class="list-unstyled">
                  <li>
                    <Link to="/" className="footer-links" as={Link}>
                      בית
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/AboutUs" className="footer-links" as={Link}>
                      אודותינו
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/Terms" className="footer-links" as={Link}>
                      תקנון האתר
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/Contact" className="footer-links" as={Link}>
                      צור קשר
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row ">
              <div class="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                <p class="social text-muted mb-0 pb-0 bold-text">
                  {" "}
                  <span class="mx-2">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                  </span>{" "}
                  <span class="mx-2">
                    <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                  </span>{" "}
                  <span class="mx-2">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                  </span>{" "}
                  <span class="mx-2">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </span>{" "}
                </p>
                <small className="rights, footer-small">
                  <span>&#174;</span> Pepper All Rights Reserved.
                </small>
              </div>
              <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                <h6 class="mt-55 mt-2 text-muted bold-text">
                  <b>מספר טלפון</b>
                </h6>
                <small className="footer-small">
                  {" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-telephone-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                      />
                    </svg>{" "}
                  </span>{" "}
                  <p>0583272883</p>
                </small>
              </div>
              <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                <h6 class="text-muted bold-text">
                  <b> כותבת מייל</b>
                </h6>
                <small className="footer-small">
                  <span>
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  takeEat100@gmail.com
                </small>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
