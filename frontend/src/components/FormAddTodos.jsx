import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const FormAddTodos = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const AddTodo = async (e) => {
    try {
      e.preventDefault();

      await axios.post("http://localhost:5000/todos", {
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
        <h1 className="text-2xl font-bold">Tambahkan Todo anda</h1>
      </div>
      <form onSubmit={AddTodo}>
        <div className="flex my-2 justify-between">
          <Link to="/todos" className="bg-red-500 py-2 px-4 rounded-md text-white">
            Back
          </Link>
          <button type="submit" className="bg-green-500 p-2 rounded-md text-white">
            Tambah
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
          <textArea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Masukkan deskripsi dari todo anda..."
            rows="15"
            className="bg-slate-100 p-4 w-full border rounded-lg"
          ></textArea>
        </div>
      </form>
    </div>
  );
};

export default FormAddTodos;
