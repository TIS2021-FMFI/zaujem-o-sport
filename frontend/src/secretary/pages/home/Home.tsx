import {Link} from "react-router-dom";

export const Home = () => {
  return (
  	<>
		  <h1>Domov</h1>
		  <Link to="/secretary/sports/list">
			  Zobraz športy
		  </Link>
		  <br/>
	  </>
  )
}