import LoginForm from './Components/LoginForm';
import './App.css';
import React, { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from "./Components/LandingPage"
import RegisterPage from "./Components/RegisterPage"
import SearchBox from "./Components/SearchBox"
import WatchList from "./Components/WatchList"
import Watched from "./Components/Watched"
import "./lib/font-awesome/css/all.min.css";
import { GlobalProvider } from "./context/GlobalState";
function App() {
  return(
    <div className='App'>
      <div className='vh-100 gradient-custom'>
      <div className='container'>
        <h1 className='page-header text-center'><p class="h0">MovieLand</p></h1>
        <GlobalProvider>
          <BrowserRouter>
            <LandingPage />

            <Routes>
              <Route path="/" element={<SearchBox />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/watched" element={<Watched />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </div>
      </div>
    </div>
  );
}  
export default App;