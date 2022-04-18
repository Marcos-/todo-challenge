import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";
import base_url from '../utils/utils'
import { Link, Navigate } from "react-router-dom";
import axios from "../utils/axios"

export default function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
    if (loggedInUser) {      
        localStorage.setItem('user', null)
        axios.post(`${base_url}logout`)
        .catch(function (error) {
          console.log(error);
        });
    } 

    setIsLoggedIn(false)
  }, []);

  return (
    <div >
        {isLoggedIn &&  <Navigate to="/login" />}
      
    </div>
  );
}