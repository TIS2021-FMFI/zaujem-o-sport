import React from "react";
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>International interest in sports</h4>
			<ul className="list-unstyled">
              <li>A project which is created within the subject Information Systems Development</li>
			</ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Authors</h4>
            <ul className="list-unstyled">
              <li>Sabína Samporová</li>
              <li>Martin Gergel</li>
              <li>Jakub Mišovský</li>
			  <li>Slavomír Holenda</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Links</h4>
            <ul className="list-unstyled">
              <li><a href = "https://www.google.com/">link</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} MATFYZ | Applied informatics |
            TIS
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
