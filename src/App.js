import "./App.css";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Item from "./Item";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const complete = todos.filter((oneTodo) => oneTodo.completed);
  const unComplete = todos.filter((oneTodo) => !oneTodo.completed);
  const [filter, setFilter] = useState(1);
  const [count, setCount] = useState(0);

  const alert_success = () =>
    toast("to do added", {
      icon: "👍",
      duration: 3000,
      className: "custom_icon",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });

  const alert_error = () =>
    toast("you didn't write what to do", {
      icon: "🤬",
      duration: 3000,
      className: "custom_icon",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });
  const alert_delete = () =>
    toast("to do deleted", {
      icon: "👋",
      duration: 3000,
      className: "custom_icon",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });
  const alert_updated = () =>
    toast("to do updated", {
      icon: "✌️",
      duration: 3000,
      className: "custom_icon",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });
  const alert_all_mark = () =>
    toast("all todos marked", {
      icon: "🙏",
      duration: 3000,
      className: "custom_icon",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });
  const alert_all_delete = () =>
    toast("all todos deleted", {
      icon: "👋",
      duration: 3000,
      className: "custom_icon",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });

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
    //Todo ekleme olayı
    setTodos([
      ...todos,
      {
        id: count,
        text: todo,
        completed: false,
      },
    ]);
    setCount(count + 1);
    alert_success();
  };

  const onSubmit = (e) => {
    // Todo form input edildiğinde çalışacak
    e.preventDefault();
    if (todo === "") return alert_error();
    addTodo();
    setTodo("");
  };
  const handleChange = (e) => {
    // Input text'in karakter girilmesine izin verdiği olay
    setTodo(e.target.value);
  };
  const deleteTodo = (todo) => {
    //trash icon tıklantığında çalışan olay
    const newTodos = [...todos];
    const index = todos.indexOf(todo);
    newTodos.splice(index, 1);
    setTodos(newTodos);
    alert_delete();
  };
  const handleCheck = (todo) => {
    //Oluşturulan todoların checked olup olmama olayı
    todo.completed = !todo.completed;
    const rest = todos.filter((to) => todo.id !== to.id);
    setTodos([...rest, todo]);
  };

  const markAllTodos = () => {
    //hepsini işaretle / kaldır
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
    alert_all_mark();
  };
  const deleteAllTodos = () => {
    //hepsini sil
    setTodos([]);
    alert_all_delete();
  };

  const show = (filter) => {
    if (filter === 1) {
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
                    alert_updated={() => alert_updated()}
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
    if (filter === 2) {
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

    if (filter === 3) {
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
            <div className="buttons_box">
              <button
                onClick={() => {
                  return setFilter(1);
                  //Filtreye gönderdiğim değeri 1 yaparak sadece tümünü gösteriyorum
                }}
              >
                All
              </button>
              <button
                onClick={() => {
                  return setFilter(2);
                  //Filtreye gönderdiğim değeri 2 yaparak sadece tümünü gösteriyorum
                }}
              >
                Active
              </button>
              <button
                onClick={() => {
                  return setFilter(3);
                  //Filtreye gönderdiğim değeri 3 yaparak sadece tümünü gösteriyorum
                }}
              >
                Completed
              </button>
            </div>
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
      <Toaster />
    </div>
  );
}

export default App;
