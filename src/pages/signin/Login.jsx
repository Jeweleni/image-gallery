import { useState, useEffect } from 'react';
import './login.css'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
import Gallery from '../gallery/Gallery';
import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


const Login = ({ onLogin }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAM-F4pciMf_WxjxVbgJQhio_OUPJNp4E0",
      authDomain: "imagesite-91298.firebaseapp.com",
      projectId: "imagesite-91298",
      storageBucket: "imagesite-91298.appspot.com",
      messagingSenderId: "32062178803",
      appId: "1:32062178803:web:fc2d4fc32c4d76de537e86"
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      await signInWithEmailAndPassword(auth, email, password);

      onLogin(true);
    } catch (error) {
      setError(true)
    }
  };

  return (
    <div className="login-container">
      <div className="loginForm">
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='errorMessage'>Invalid login credentials. Please check your email and password.</p>}
          <div className="loginButton">
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
        <div>
      {authenticated ? (
        <DndProvider backend={HTML5Backend}>
          <Gallery />
        </DndProvider>
      ) : (
        <Login onLogin={setAuthenticated} />
      )}
      </div>
      </div>
    </div>
  );
};

export default Login;