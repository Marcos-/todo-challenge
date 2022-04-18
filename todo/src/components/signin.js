import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "../App.css"
import { Link, Navigate } from "react-router-dom"
import base_url from '../utils/utils'
import axios from "../utils/axios"

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0 && password === repeatpassword;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post(`${base_url}register`, { 
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
        <Form.Group size="lg" controlId="password">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            value={repeatpassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Signin
        </Button>
        <Link id="login_link" to="/login">Log in</Link> 
      </Form>
    </div>
  );
}