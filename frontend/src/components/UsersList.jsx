import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      await getUsers();
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">User List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Nama</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Edit</th>
              <th className="px-4 py-3 border">Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="text-center hover:bg-gray-100 transition">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{user.name}</td>
                <td className="px-4 py-3 border">{user.email}</td>

                <td className="px-4 py-3 border">
                  {user.role !== "admin" && (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                  )}
                </td>

                <td className="px-4 py-3 border">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => deleteUser(user.uuid)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
