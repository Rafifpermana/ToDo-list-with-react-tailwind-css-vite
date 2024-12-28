import React from "react";
import task from "../assets/task.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md flex flex-col
    p-7 min-h-[600px] rounded-xl"
    >
      <div className="flex items-center mt-7 gap-2">
        <img className="w-10" src={task} alt="" />
        <h1 className="text-2xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-300 rounded-full">
        <input
          className="bg-transparent border-none outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-900"
          type="text"
          placeholder="Add Task"
        />
        <button className="border-none rounded-full bg-blue-600 w-32 h-14 text-white font-medium cursor-pointer">
          ADD +
        </button>
      </div>

      <div>
        <TodoItems />
      </div>
    </div>
  );
};

export default Todo;
