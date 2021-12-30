import {Link} from "react-router-dom";

export const Home = () => {
  return (
  	<>
		  <h1>Home</h1>
		  <Link to="/secretary/sports">
			  Zobraz športy
		  </Link>
		  <br/>
		  <Link to="/secretary/countries">
			  Zobraz krajiny
		  </Link>
		  <br/>
		  <Link to="/secretary/logout">
			  Logout
		  </Link>
	  </>
  )
}