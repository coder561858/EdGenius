// src/Pages/Components/Home/WalletLogin.jsx
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import './Login.css'; // Optional: styling reuse

const WalletLogin = () => {
  const { login, logout, authenticated, ready, user } = usePrivy();

  if (!ready) return <div className="login-box">Loading...</div>;

  return (
    <div className="left-panel">
      <div className="login-box">
        <h2>Welcome!</h2>
        <p>Sign in to continue to <b className="highlight">EdGenius</b></p>

        {!authenticated ? (
          <button className="google-login" onClick={login}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Icon"
              style={{ width: '20px', marginRight: '8px' }}
            />
            Connect with Google Wallet
          </button>
        ) : (
          <>
            <p>✅ Logged in as: <b>{user?.email?.address}</b></p>
            <p>💼 Wallet Address: <code>{user?.wallet?.address}</code></p>
            <button className="google-login" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletLogin;
