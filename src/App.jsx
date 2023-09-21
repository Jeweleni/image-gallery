import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./index.css";
import Login from "./pages/signin/Login";
import Gallery from "./pages/gallery/Gallery"
import { imageData } from "./components/imageData";
import Footer from "./components/footer/Footer";

function App() {
  const [setAuthenticated] = useState(false);
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
  }, [setAuthenticated]);
  return (
    <Router>

      <div className="App">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/gallery" element={<Gallery imageData={imageData} />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer/>
        
      </div>
    </Router>
  );
}

export default App;
