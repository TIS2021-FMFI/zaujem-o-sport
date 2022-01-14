import styles from './Nav.module.css';
import logo from './logo.png';
import {Link} from "react-router-dom";


export const Nav = () => {
  return (
  	<>
		  <nav className={styles.nav}>
		  <img src={logo} width="100" />
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
			  <Link className="link" to="/interconnectedness">
				  Interconnectness
			  </Link>
		  </nav>
	  </>
  )
}