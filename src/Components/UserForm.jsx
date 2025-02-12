import { useState } from "react";
import PropTypes from "prop-types"

const Userform = ({ addNewUser }) => {
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
    const [error, setError] = useState({ name: "", email: "" });
  
    const validate = (name, value) => {
      let errorMsg = "";
      if (name === "name") {
        if (!value.trim()) {
          errorMsg = "Name is required!";
        }
      }
  
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errorMsg = "Email is required.";
        } else if (!emailRegex.test(value)) {
          errorMsg = "Invalid email format.";
        }
      }
  
      setError((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!error.name && !error.email && newUser.name && newUser.email) {
        addNewUser(newUser);
        setNewUser({ name: "", email: "", role: "User" });
        setError({ name: "", email: "" });
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      validate(name, value);
      setNewUser({ ...newUser, [name]: value });
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
          </div>
  
          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>
  
          <div>
            <label className="block text-gray-700 font-medium">Role:</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
  
          <button
            type="submit"
            disabled={error.name || error.email || !newUser.name || !newUser.email}
            className="w-full bg-blue-500 text-white p-2 rounded font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };
  
  Userform.propTypes = {
    addNewUser: PropTypes.func.isRequired,
  };
  
  export default Userform;