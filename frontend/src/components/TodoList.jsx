import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${userId}`);
      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-end mb-4">
        <Link
          to="/todos/add"
          className=" p-3 text-xl text-white font-medium bg-green-500 hover:bg-green-400 hover:shadow-lg transition  rounded-md"
        >
          Add New
        </Link>
      </div>
      <div className="container items-start  flex gap-11 flex-wrap ">
        {/* Card Todo List */}
        {todo.map((item, index) => (
          <div key={index} className="bg-slate-300 border shadow-xl p-4 rounded-md w-70 h-65">
            <h1 className="text-xl truncate font-medium">{item.title}</h1>
            <div className="min-h-38 pt-2">
              <p className=" line-clamp-4 font-light">{item.description}</p>
            </div>
            <div className="flex justify-around ">
              <Link
                to={`/todos/edit/${item.uuid}`}
                className="p-2 bg-blue-500 rounded-md text-white text-xl px-6 font-medium mx-2"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteTodo(item.uuid)}
                className="p-2 bg-red-500 rounded-md text-white text-xl px-3 font-medium mx-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
