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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const hasCompletedTasks = todoList.some((todo) => todo.isComplete);
  const hasIncompleteTasks = todoList.some((todo) => !todo.isComplete);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden mx-4 my-8 sm:my-16">
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
            className="bg-transparent border-none outline-none flex-1 h-12 pl-4 pr-2 placeholder:text-gray-500 text-sm sm:text-base"
            type="text"
            placeholder="Add Task"
          />
          <button
            onClick={add}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-4 sm:px-6 h-12 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
          >
            ADD +
          </button>
        </div>

        <div className="mt-4 relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 rounded-md focus:outline-none focus:border-blue-500 text-sm w-32"
          >
            <span>
              {filter === "all"
                ? "All"
                : filter === "completed"
                ? "Completed"
                : "Incomplete"}
            </span>
            <svg
              className={`h-4 w-4 transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-32">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => {
                    setFilter("all");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  role="menuitem"
                >
                  All
                </button>
                {hasCompletedTasks && (
                  <button
                    onClick={() => {
                      setFilter("completed");
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    role="menuitem"
                  >
                    Completed
                  </button>
                )}
                {hasIncompleteTasks && (
                  <button
                    onClick={() => {
                      setFilter("incomplete");
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    role="menuitem"
                  >
                    Incomplete
                  </button>
                )}
              </div>
            </div>
          )}
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
              editTodo={editTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
