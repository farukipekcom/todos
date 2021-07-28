import React, { useState } from "react";
import "./App.css";
import TrashIcon from "./TrashIcon";
const Item = ({ todoItem, setTodos, todos, deleteTodo, onChange }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(todoItem.text);

  const handleEditChange = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleEditSubmit = (id) => {
    const editedList = todos.map((oneTodo) => {
      if (oneTodo.id === id) {
        oneTodo.text = todo;
      }
      return oneTodo;
    });
    localStorage.setItem("items", JSON.stringify(editedList));
    setTodos(editedList);
    handleEdit();
  };

  return (
    <div className="custom__item">
      {!edit ? (
        <>
          <label className="item">
            <input
              type="checkbox"
              id="checkbox1"
              checked={todoItem.completed}
              onChange={onChange}
            />
            <span className="todo-text">{todoItem.text}</span>
            <span className="checkmark"></span>
          </label>
          <div className="editIcon icon click">
            <img
              src="./edit.svg"
              onClick={handleEdit}
              disabled={todoItem.completed}
              height="24px"
              alt=""
            />
          </div>
          <div className="trashIcon click icon" onClick={deleteTodo}>
            <img src="./trash.svg" height="24px" alt="" />
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={todo}
            name="todo"
            onChange={handleEditChange}
          />
          <button onClick={handleEdit}>Cancel</button>
          <button type="submit" onClick={() => handleEditSubmit(todoItem.id)}>
            Save
          </button>
          <div className="trashIcon">
            <TrashIcon buttonClick={deleteTodo} className="trash" />
          </div>
        </>
      )}
    </div>
  );
};

export default Item;

//   <>
//   <label className="item">
//   <input
//     type="checkbox"
//     id="checkbox1"
//     checked={todo.completed}
//     onChange={onChange}
//   />
//   <span className="todo-text">{todo.text}</span>
//   <span className="checkmark"></span>
// </label>

//   </>
