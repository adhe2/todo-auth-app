import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormEditTodos = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getTodoById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/todos/${id}`);

        setTitle(response.data.title);
        setDesc(response.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    getTodoById();
  }, [id]);

  const updateTodo = async (e) => {
    try {
      e.preventDefault();

      await axios.patch(`http://localhost:5000/todos/${id}`, {
        title: title,
        description: desc,
      });
      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-2xl font-bold">Edit Todo anda</h1>
      </div>
      <form onSubmit={updateTodo}>
        <div className="flex my-2 justify-between">
          <Link to="/todos" className="bg-red-500 py-2 px-4 rounded-md text-white">
            Back
          </Link>
          <button type="submit" className="bg-blue-500 p-2 px-8 rounded-md text-white">
            Ya
          </button>
        </div>
        <div className="">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan Title todo anda..."
            className="bg-slate-200 p-2 w-full rounded-lg my-4 border"
          />
        </div>
        <div className="">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Masukkan deskripsi dari todo anda..."
            rows="15"
            className="bg-slate-100 p-4 w-full border rounded-lg"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default FormEditTodos;
