import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login, ready, authenticated, user } = usePrivy();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: ''
  });

  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect

  useEffect(() => {
    if (ready && authenticated && user?.wallet?.address) {
      const toastId = toast.success(
        <div style={{ textAlign: 'center' }}>
          <strong>🎉 Wallet Created!</strong>
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            Address: {user.wallet.address}
          </div>
          <button
            onClick={() => navigate('/quiz')}
            style={{
              marginTop: '10px',
              padding: '6px 12px',
              background: '#4dc6ff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Go to Quiz
          </button>
          <button
            onClick={() => toast.dismiss(toastId)} // Manually close the toast
            style={{
              marginTop: '10px',
              padding: '6px 12px',
              background: '#ff4c4c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Close
          </button>
        </div>,
        { autoClose: false } // Prevent auto close
      );
    }
  }, [authenticated, user, ready, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateInput = (field, value) => {
    if (!value.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `Please fill out ${field}`
      }));
      return false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: ''
      }));
      return true;
    }
  };

  const handleBlur = (e) => {
    validateInput(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      if (!validateInput(field, formData[field])) isValid = false;
    });

    if (isValid) {
      const username = formData.username.trim();
      window.location.href = `./EnglishLevels.html?username=${encodeURIComponent(username)}`;
    } else {
      toast.error('Please fix the errors');
    }
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #1a1f27, #232a33)'
    },
    leftPanel: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '20px'
    },
    loginBox: {
      width: '330px',
      textAlign: 'center',
      border: '2px solid #ccc',
      padding: '20px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #1a4632, #345c63, #2e2e2e)',
      transition: 'transform 0.2s ease', 
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)' 
    },
    highlight: {
      color: '#4dc6ff'
    },
    inputGroup: {
      marginBottom: '15px',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontSize: '14px'
    },
    rememberForgot: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      marginBottom: '15px'
    },
    submitButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4dc6ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    orSeparator: {
      margin: '15px 0',
      textAlign: 'center',
      position: 'relative',
      color: '#aaa'
    },
    googleLogin: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '10px',
      backgroundColor: 'white',
      color: '#333',
      border: '1px solid #ddd',
      borderRadius: '4px',
      textDecoration: 'none',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    profileIcon: {
      margin: '15px auto',
      width: '80px',
      height: '80px'
    },
    profileImage: {
      width: '100%',
      borderRadius: '50%'
    },
    link: {
      color: '#4dc6ff',
      textDecoration: 'none'
    }
  };

  if (!ready) return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Loading...</div>;

  return (
    <div style={styles.leftPanel}>
      <div
        style={styles.loginBox}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
      >
        <h2>Welcome!</h2>
        <p>Sign up to continue to <b style={styles.highlight}>EdGenius</b></p>
        <div style={styles.profileIcon}>
          <img src="/imagep2.png" alt="profile" style={styles.profileImage} />
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            />
            {formErrors.username && (
              <div className="input-group__error" style={{ color: 'red' }}>{formErrors.username}</div>
            )}
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            />
            {formErrors.password && (
              <div className="input-group__error" style={{ color: 'red' }}>{formErrors.password}</div>
            )}
          </div>
          <div style={styles.rememberForgot}>
            <label><input type="checkbox" /> Remember</label>
            <a href="#" style={styles.link}>Forgot Password?</a>
          </div>
          <button type="submit" style={styles.submitButton}>SIGN UP</button>
        </form>
        <div style={styles.orSeparator}>OR</div>
        <button onClick={login} style={styles.googleLogin}>
          <img
            src="https://ethans.co.in/wp-content/uploads/2022/12/google.png"
            alt="Google Icon"
            style={{ width: '20px', marginRight: '8px' }}
          />
          Log in with Google
        </button>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default Login;
