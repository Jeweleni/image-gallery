import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./index.css";
import Login from "./pages/signin/Login";
import Gallery from "./pages/gallery/Gallery";
import { imageData } from "../src/data/imageData";
import HomePage from "./pages/home/HomePage";
import app from "./firebaseConfig";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            {authenticated ? (
              <Route
                path="/gallery"
                element={
                  <ErrorBoundary>
                    <Gallery imageData={imageData} />
                  </ErrorBoundary>
                }
              />
            ) : (
              <Route path="/gallery" element={<Navigate to="/login" />} />
            )}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
