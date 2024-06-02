import React, { useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



export default function LandingPage(){
  const navigate = useNavigate();


  const goToHome = () => {
    navigate("/");
  }
  return(
    <div className="landing-page">
      <header className="header1">
        <div className="header-left">
          <button className="home-button">
            <FaHome size={24} onClick={goToHome} />
          </button>
        </div>

        <ul className="header-right">
          <li>
            <Link to="/watchlist" className="btn fs-4 white-text">Watch List</Link>
          </li>

          <li>
            <Link to="/watched" className="btn fs-4 white-text">Watched</Link>
          </li>

          <li>
            <Link to="/login" className="btn btn-success fs-4 ">Login</Link>
          </li>
        </ul>
      </header>
    </div>
  )
}