import React, { useState, useEffect } from "react"
import "./App.css"
import Project from "./components/project"
import { Link, Navigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import base_url from './utils/utils'
import axios from './utils/axios'

function App() {

  const empty = {title: '', tasks: [], user: ''}

  const [newItem, setNewItem] = useState(empty);
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("loggedInUser", loggedInUser)
    if (loggedInUser) {      
      setUser(loggedInUser);
  
      axios.get(`${base_url}projects`, { params: { id: loggedInUser._id } }).then((e) => {
        console.log(e)
        setItems(e.data)
      });

    } else {
      setIsLoggedIn(false)
    }
  }, []);

  function addItem() {
    // ! Check for empty item
    if (!newItem) {
    alert("Press enter an item.");
    return;
    }

    axios.post(`${base_url}projects`, newItem)
      .then(function (response) {
        if(response.status === 200) {
            // Add new item to items array
            setItems((oldList) => [...oldList, newItem]);

            // Reset newItem back to original state
            setNewItem(empty);
        } else {
            console.log('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editItem(item) {

    axios.put(`${base_url}projects`, item)
      .then(function (response) {
        if(response.status === 200) {
          console.log("Editado com sucesso", response)
        } else {
            console.log('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeItem(item) {

    axios.delete(`${base_url}projects`, item)
      .then(function (response) {
        if(response.status === 200) {
            // Remove item from state
            console.log(response)
            setItems((oldList) => oldList.filter((o)=> o.title !== item.title));
        } else {
            console.log('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Main part of app
  return (
    <div className="App">
      {!isLoggedIn && <Navigate to="/login" />}
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link id="logo" to="/">To do's Boltech</Link>
        {!isLoggedIn && 
        <Link id="login_link" to="/login">Login</Link> }
        {isLoggedIn && 
        <Link id="login_link" to="/logout">Logout</Link> }
        
      </nav>
      <div className="projects">
        {items?.map(i => 
          <Project className="single_project" projectItem={i} editItem={editItem} removeItem={removeItem}></Project>
        )}
        <Card className="single_project">
            <Card.Header>Create new project</Card.Header>
            <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  placeholder="Enter project name" 
                  value={newItem.title} 
                  onChange={(e) => setNewItem({title: e.target.value, user: user._id})}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => addItem()}>Create project</Button>
            </Card.Body>
        </Card>
      </div>
      
    </div>
  );
}

export default App;