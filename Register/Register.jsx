import { useState } from 'react';
import styles from "./Register.module.scss";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    country: 'Nepal',
    email: '',
    firstName: '',
    lastName: '',
    displayName: '',
    password: '',
    newsSubscription: false,
    termsAgreed: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <div className={styles.selectWrapper}>
            <select 
              id="country" 
              name="country" 
              value={formData.country} 
              onChange={handleChange}
              className={styles.inputField}
            >
              <option value="Nepal">Nepal</option>
            </select>
            <span className={styles.arrowIcon}>&#9662;</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.nameRow}>
          <div className={`${styles.formGroup} ${styles.half}`}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.half}`}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="displayName">Display Name</label>
          <div className={styles.inputWithIcon}>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className={styles.inputField}
            />
            <button type="button" className={styles.infoIcon}>
              <span>i</span>
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputWithIcon}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
            />
            <div className={styles.passwordIcons}>
              <button 
                type="button" 
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️'}
              </button>
              <button type="button" className={styles.infoIcon}>
                <span>i</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabelContainer}>
            <input
              type="checkbox"
              name="newsSubscription"
              checked={formData.newsSubscription}
              onChange={handleChange}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.checkboxText}>
              Send me news, surveys and special offers from Epic Games
            </span>
          </label>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabelContainer}>
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.checkboxText}>
              I have read and agree to the <a href="#terms">Terms of Service</a> and the <a href="#eula">Epic Games Store End User License Agreement</a>
            </span>
          </label>
        </div>

        <button type="submit" className={styles.continueBtn}>Continue</button>
      </form>
    </div>
  );
};

export default SignupForm;
