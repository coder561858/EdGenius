import React from 'react';
import './Login.css'; // move your styles here or use Tailwind

const Login = () => {
  return (
    <div className="left-panel">
      <div className="login-box">
        <h2>Welcome!</h2>
        <p>Sign up to continue to <b className="highlight">EdGenius</b></p>
        <div className="profile-icon">
          <img src="/imagep2.png" alt="profile" />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Username" data-field="username" />
          <div className="input-group__error"> </div>
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" data-field="password" />
          <div className="input-group__error"> </div>
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember</label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">SIGN UP</button>
        <div className="or-separator">OR</div>
        <a href="/auth/google" className="google-login">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Icon"
            style={{ width: '20px', marginRight: '8px' }}
          />
          Log in with Google
        </a>
      </div>
    </div>
  );
};

export default Login;
