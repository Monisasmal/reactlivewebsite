import React, { useState, useEffect } from "react";
import "./style.css";

// get the local storage data
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const ToDo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setitems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState();
  const [toggleButton, setToggleButton] = useState(false);

  // Add Items

  const addItem = () => {
    if (!inputdata) {
      alert("please fill the data");
    } else if (inputdata && toggleButton) {
      setitems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);


    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setitems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // How to Delete Item

  const deleteItem = (Index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== Index;
    });
    setitems(updatedItems);
  };

  // Remove all Items

  const removeAll = () => {
    setitems([]);
  };

  // Adding Local Storage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  // Edit Items

  const editItem = (Index) => {
    const item_todo_edit = items.find((curElem) => {
      return curElem.id === Index;
    });
    setInputData(item_todo_edit.name);
      setIsEditItem(Index);
      setToggleButton(true);

  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="Images/TODOLIST.jpg" alt="todologo" />
            <figcaption>Add Your List Here 👍</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i class="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i class="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* Show our Item */}

          <div className="showItems">
            {items.map((curElem, Index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      class="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove all the Button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
