import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";
import base_url from '../utils/utils'
import { Link, Navigate } from "react-router-dom";
import axios from "../utils/axios"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(event)

    axios.post(`${base_url}login`, { 
        username: email, 
        password: password })
      .then(function (response) {
        console.log(response)
        if(response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data))
           setIsLoggedIn(true)
        } else {
            console.log('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="Login">
        {isLoggedIn &&  <Navigate to="/" />}
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <Link id="login_link" to="/signin">Sign in</Link> 
      </Form>
    </div>
  );
}