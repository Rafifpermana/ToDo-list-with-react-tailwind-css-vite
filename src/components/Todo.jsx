import { useEffect, useRef, useState } from "react";
import task from "../assets/task.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [filter, setFilter] = useState("all");
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  const editTodo = (id, newText) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      });
    });
  };

  const filteredTodos = todoList.filter((todo) => {
    if (filter === "completed") return todo.isComplete;
    if (filter === "incomplete") return !todo.isComplete;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center gap-2">
          <img className="w-10" src={task} alt="task" />
          <h1 className="text-2xl font-semibold text-white">To-Do List</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center bg-gray-100 rounded-full shadow-inner p-2">
          <input
            ref={inputRef}
            className="bg-transparent border-none outline-none flex-1 h-12 pl-4 pr-2 placeholder:text-gray-500"
            type="text"
            placeholder="Add Task"
          />
          <button
            onClick={add}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-6 h-12 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            ADD +
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-full ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`px-4 py-2 rounded-full ${
              filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Incomplete
          </button>
        </div>

        <div className="mt-6 space-y-3 max-h-[400px] overflow-y-auto">
          {filteredTodos.map((item) => (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              editTodo={(id) => {
                const newText = prompt("Edit your task", item.text);
                if (newText !== null) {
                  editTodo(id, newText);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
