// src/pages/Login.js
import React, { useState } from 'react';
import Header from "../components/Header";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext'; // Import du hook useUser
import Footer from '../components/Footer';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser(); // Récupération de la fonction loginUser

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);

    // Appel de la fonction loginUser pour mettre à jour le contexte utilisateur
    if (username) {
      loginUser(username);
      navigate('/'); // Redirects to the home page (root route) après la connexion
    }
  };

  return (
    <div id="pageWrapper">
      <Header />
      <section
        className="introBannerHolder d-flex w-100 bgCover"
        style={{ backgroundImage: 'url("images/b-bg7.jpg")'}}

        >
        <div className="container">
          <div className="row">
            <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
              <h1 className="headingIV fwEbold playfair mb-4">Contact</h1>
              <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                <li className="mr-2">
                  <a href="home.html">Home</a>
                </li>
                <li className="mr-2">/</li>
                <li className="active">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don’t have an account? 
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
