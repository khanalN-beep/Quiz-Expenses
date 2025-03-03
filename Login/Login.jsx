import styles from "./login.module.scss";
 import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.loginPage}>
    <div className={styles.loginContainer}>
        <h1>Login</h1>
      <form className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <input type="text" id="username" placeholder="Email or phone number" />
        </div>
        <div className={styles.inputGroup}>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <button className={styles.loginButton}>Login</button>
        <div className={styles.forgotPassword}>
          <a href="#">Forgot Password?</a>
        </div>
        <div className={styles.createAccount}>
          <Link to="/register">Create new account?</Link>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#">Privacy Policy</a>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Login;
