import React, { useState, useEffect } from "react";
import Task from "./task"
import "../App.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Project ({
    projectItem,
    editItem,
    removeItem
}) {

    const [newItem, setNewItem] = useState("");
    const [items, setItems] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        setItems(projectItem.tasks.filter((item) => !item.isChecked ))
        setDone(projectItem.tasks.filter((item) => item.isChecked ))
    }, []);

    useEffect(() => {
        projectItem.tasks = [...items, ...done]

        editItem(projectItem)
    }, [items, done]);

      /* Adds a new item to the list array*/
    function addItem() {
        // ! Check for empty item
        if (!newItem) {
        alert("Press enter an item.");
        return;
        }

        const item = {
            id: Math.floor(Math.random() * 1000),
            value: newItem,
            isChecked: false
        };

        // Add new item to items array
        setItems((oldList) => [...oldList, item]);

        projectItem.tasks = [...items, item]
        console.log(projectItem)
 
        // Reset newItem back to original state
        setNewItem("");

        editItem(projectItem)
    }
    
    return (
        <Card>
            <Card.Header>
                {projectItem.title}
                <button
                  className="delete-button"
                  onClick={() => removeItem(projectItem)}>
                  ❌
                </button>
            </Card.Header>
            <Card.Body>
                <Card.Title>To do:</Card.Title>
                
                    <Task 
                        items={items}
                        setItems={setItems}
                        setDone={setDone}>
                    </Task>
                <Card.Title>Done:</Card.Title>
                <Task 
                    items={done}
                    setItems={setDone}
                    setDone={setItems}>
                </Task>
            
                <Form.Control 
                    type="text" 
                    placeholder="Enter todo" 
                    value={newItem} 
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button onClick={() => addItem()}>Add</button>
            </Card.Body>
        </Card>
        
    )
}

export default Project;
