import PropTypes from "prop-types";
import not_tick from "../assets/not_tick.png";
import tick from "../assets/tick.png";
import delete_icon from "../assets/delete_icon.png";
import pensil from "../assets/pensil.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
  return (
    <div
      className={`flex items-center justify-between my-2 p-3 rounded-lg shadow-md transition-all duration-200 ${
        isComplete ? "bg-blue-50" : "bg-white"
      }`}
    >
      <div
        onClick={() => toggle(id)}
        className="flex items-center cursor-pointer flex-1"
      >
        <img src={isComplete ? tick : not_tick} alt="" className="w-6 h-6" />
        <p
          className={`ml-4 text-lg ${
            isComplete
              ? "line-through text-gray-500 font-medium"
              : "text-gray-700"
          }`}
        >
          {text}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => editTodo(id)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <img src={pensil} alt="edit" className="w-5 h-5" />
        </button>
        <button
          onClick={() => deleteTodo(id)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <img src={delete_icon} alt="delete" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

TodoItems.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoItems;
