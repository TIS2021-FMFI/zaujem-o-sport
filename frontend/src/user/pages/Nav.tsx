import styles from './Nav.module.css';
import logo from './logo.png';

export const Nav = () => {
  return (
  	<>
		  <nav className={styles.nav}>
		  <img src={logo} width="100"></img>
		  <button className={styles.button}>Home</button>
		  <button className={styles.button}>Export</button>
		  <button className={styles.button}>Fundings</button>
		  <button className={styles.button}>Success</button>
		  <button className={styles.button}>Interconnectness</button>
		  </nav>
		  
	  </>
  )
}
