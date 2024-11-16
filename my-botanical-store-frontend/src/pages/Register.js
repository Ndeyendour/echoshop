import React, { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation
  
    const handleRegister = (e) => {
      e.preventDefault();
      // Handle registration logic here
      console.log('Registering with:', username, email, password);
  
      // After successful registration, redirect to login page
      navigate('/login'); // Redirects to the login page
    }
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
      <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

export default Register;
