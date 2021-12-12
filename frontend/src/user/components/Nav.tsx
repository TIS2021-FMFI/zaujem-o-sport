import styles from './Nav.module.css';
import logo from './logo.png';
import {Link, Router} from "react-router-dom";


export const Nav = () => {
  return (
  	<>
		  <nav className={styles.nav}>
		  <img src={logo} width="100"></img>
			  <Link  to="/">
				  Home
			  </Link>
			  <Link  to="/export">
				  Export
			  </Link>
			  <Link to="/funding">
				  Funding
			  </Link>
			  <Link className="link" to="/success">
				  Success
			  </Link>
			  <Link className="link" to="/interconnectness">
				  Interconnectness
			  </Link>
		  </nav>
	  </>
  )
}
