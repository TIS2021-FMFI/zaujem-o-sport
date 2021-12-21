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
            <h4>Medzinárodný záujem o šport</h4>
			<ul className="list-unstyled">
              <li>Projekt ktorý je vytváraný 
			  v rámci predmetu Tvorba 
			  informačných systémov</li>
			</ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Autori</h4>
            <ul className="list-unstyled">
              <li>Sabína Samporová</li>
              <li>Martin Gergel</li>
              <li>Jakub Mišovský</li>
			  <li>Slavomír Holenda</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Odkazy</h4>
            <ul className="list-unstyled">
              <li><a href = "https://www.google.com/">odkaz</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} MATFYZ | Aplikovaná informatika |
            TIS
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
