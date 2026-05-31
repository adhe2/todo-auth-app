import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <aside className="w-64 h-screen fixed bg-slate-900 text-white p-5">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">MyApp</h1>
      </div>

      {/* Menu */}
      <nav>
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/todos" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              Todos
            </Link>
          </li>

          <li>
            {user && user.role === "admin" && (
              <Link to="/users" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                Users
              </Link>
            )}
          </li>

          <li>
            <a href="#" className="block px-4 py-3 rounded-lg hover:bg-red-500 transition">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
