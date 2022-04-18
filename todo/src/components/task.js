import React, { useState } from "react";
import "../App.css";

function Task({
  items,
  setItems,
  setDone,
}) {

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  // Helper Functions

  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
      isChecked: false
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  function checkItem(item) {
    item.isChecked = !item.isChecked
    setDone((oldList) => [...oldList, item])
    const newArray = items.filter((i) => i.id !== item.id);
    setItems(newArray);
  }

  return (
    <ul>
      {items?.map((item) => {
        return (
          <div className="task_item" key={item.id}>
            {showEdit == item.id ? (
              <div>
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
                <button onClick={() => editItem(item.id, updatedText)}>
                  Update
                </button>
                <button onClick={() => setShowEdit(-1)}>
                  Cancel
                </button>
              </div>
            ) : 
              <li key={item.id}>
                {/* <input type="checkbox" id="scales" name="scales" checked> </input> */}
                <div>
                  <input type="checkbox" id="scales" name="scales" onChange={() => checkItem(item)} checked={item.isChecked}/>
                  <label for="scales" onClick={() => setShowEdit(item.id)}>{item.value}</label>
                </div>
                
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}>
                  ❌
                </button>
              </li>
            }
          </div>
        )
      })}
    </ul>
  );

}

export default Task;