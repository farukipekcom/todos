import React, { useState } from "react";
import "./App.css";
const Item = ({
  todoItem,
  setTodos,
  todos,
  deleteTodo,
  onChange,
  alert_updated,
}) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(todoItem.text);

  const handleEditChange = (e) => {
    // inpute değer girilen olay
    e.preventDefault();
    // girilen değeri atadım
    setTodo(e.target.value);
  };
  const handleEdit = () => {
    // edit olayında cancel butonu tıklandığında çalışan olay
    setEdit(!edit);
  };

  const handleEditSubmit = (id) => {
    // edit olayında submit edildiğinde çalışan olay
    const editedList = todos.map((oneTodo) => {
      if (oneTodo.id === id) {
        oneTodo.text = todo;
      }
      return oneTodo;
    });
    localStorage.setItem("items", JSON.stringify(editedList));
    setTodos(editedList);
    handleEdit();
    alert_updated();
  };

  return (
    <div className="custom__item ">
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
          <button
            type="submit"
            onClick={() => handleEditSubmit(todoItem.id)}
            alert_updated
          >
            Save
          </button>
          <div className="delete__icon" buttonClick={deleteTodo}>
            <img
              src="./trash.svg"
              onClick={handleEdit}
              disabled={todoItem.completed}
              height="24px"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
