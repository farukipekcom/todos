import "./App.css";
import React, { useState, useEffect } from "react";
import Item from "./Item";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const complete = todos.filter((oneTodo) => oneTodo.completed);
  const unComplete = todos.filter((oneTodo) => !oneTodo.completed);
  const [filter, setFilter] = useState(1);
  const [count, setCount] = useState(0);
  todos.sort((a, b) => (a.id > b.id ? 1 : -1));
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")) || []);
  }, []);
  useEffect(() => {
    setCount(JSON.parse(localStorage.getItem("count")) || null);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: count,
        text: todo,
        completed: false,
      },
    ]);
    setCount(count + 1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === "") return;
    addTodo();
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const deleteTodo = (todo) => {
    const newTodos = [...todos];
    const index = todos.indexOf(todo);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const handleCheck = (todo) => {
    todo.completed = !todo.completed;
    const rest = todos.filter((to) => todo.id !== to.id);
    setTodos([...rest, todo]);
  };

  const markAllTodos = () => {
    unComplete.length > 0 ? (
      <>
        {unComplete.map((item) => {
          item.completed = true;
          const rest = todos.filter((to) => todo.id !== to.id);
          setTodos([...rest]);
        })}
      </>
    ) : (
      <>
        {complete.map((item) => {
          item.completed = false;
          const rest = todos.filter((to) => todo.id !== to.id);
          setTodos([...rest]);
        })}
      </>
    );
  };
  const deleteAllTodos = () => {
    setTodos([]);
  };

  const show = (kontrol) => {
    if (kontrol === 1) {
      return (
        <div className="box">
          <h3>All Todo</h3>
          {todos.length > 0 ? (
            <ul>
              {todos.map((item, index) => (
                <li key={index}>
                  <Item
                    todoItem={item}
                    setTodos={setTodos}
                    todos={todos}
                    key={item.id}
                    deleteTodo={() => deleteTodo(item)}
                    onChange={() => handleCheck(item)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <h3>No Todo</h3>
          )}
        </div>
      );
    }
    if (kontrol === 2) {
      return (
        <div className="box">
          <h3>Active Todo</h3>

          {unComplete.length > 0 ? (
            <ul>
              {unComplete.map((item, index) => (
                <li key={index}>
                  <Item
                    todoItem={item}
                    setTodos={setTodos}
                    todos={todos}
                    key={item.id}
                    deleteTodo={() => deleteTodo(item)}
                    onChange={() => handleCheck(item)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <h3>No Todo</h3>
          )}
        </div>
      );
    }

    if (kontrol === 3) {
      return (
        <div className="box">
          <h3>Completed Todo</h3>
          {complete.length > 0 ? (
            <ul>
              {complete.map((item, index) => (
                <li key={index}>
                  <Item
                    todoItem={item}
                    setTodos={setTodos}
                    todos={todos}
                    key={item.id}
                    deleteTodo={() => deleteTodo(item)}
                    onChange={() => handleCheck(item)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <h3>No Todo</h3>
          )}
        </div>
      );
    }
  };
  return (
    <div className="container">
      <h1>todos</h1>

      <form className="custom__form" onSubmit={onSubmit}>
        <input
          placeholder="What needs to be done?"
          value={todo}
          onChange={handleChange}
          type="text"
        />
        <button>Add</button>
      </form>
      {show(filter)}
      <div className="footer">
        <p className="count">{unComplete.length} items left</p>
        <div className="buttons">
          <div className="buttons__left">
            <span>Filter:</span>
            <button
              onClick={() => {
                return setFilter(1);
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                return setFilter(2);
              }}
            >
              Active
            </button>
            <button
              onClick={() => {
                return setFilter(3);
              }}
            >
              Completed
            </button>
          </div>
          <div className="button__right">
            <div className="custom__button" onClick={markAllTodos}>
              <img src="../check-solid.svg" width="24px" alt="" />
              Mark All Todos
            </div>
            <div className="custom__button" onClick={deleteAllTodos}>
              <img src="../trash.svg" width="24px" alt="" />
              Delete All Todos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
