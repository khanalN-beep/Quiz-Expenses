import styles from './navbar.module.scss';
import { Link } from 'react-router-dom'; // ✅ Correct Import

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles['left-side']}>
        <img src="logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.store}>STORE</span>
        <Link to="#" className={styles.support}>Support</Link> {/* Changed <a> to <Link> */}
        
        <div className={styles.dropdown}>
          <Link to="#" className={styles['dropdown-toggle']}>Distribute</Link> {/* Changed <a> to <Link> */}
          <ul className={styles['dropdown-lists']}>
            <li>Distribute on Epic Games Store</li>
            <li>Developer Forum</li>
            <li>Documentation</li>
            <li>Learning</li>
          </ul>
        </div>
      </div>

      <div className={styles['right-side']}>
        <Link to="/login" className={styles['sign-in-btn']}>Sign In</Link> {/* ✅ Works Now */}
        <button className={styles['download-btn']}>Download</button>
      </div>
    </nav>
  );
};

export default Navbar;
