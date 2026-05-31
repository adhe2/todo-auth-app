import "./App.css";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Todos from "./pages/Todos";
import AddTodos from "./pages/AddTodos";
import EditTodos from "./pages/EditTodos";
import Users from "../src/pages/Users";
import FormRegistration from "./components/FormRegistration";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrasi" element={<FormRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/add" element={<AddTodos />} />
        <Route path="/todos/edit/:id" element={<EditTodos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
