import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UpdateUserForm = ({ userToEdit, onUpdateUser, onCancel }) => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "User" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  const validate = (name, value) => {
    let errorMsg = "";

    if (name === "name" && !value.trim()) {
      errorMsg = "Name is required.";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMsg = "Email is required.";
      } else if (!emailRegex.test(value)) {
        errorMsg = "Invalid email format.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.name && !errors.email && formData.name && formData.email) {
      onUpdateUser(formData);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
        Update User
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={errors.name || errors.email || !formData.name || !formData.email}
            className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Update User
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateUserForm.propTypes = {
    userToEdit: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
    onUpdateUser: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

export default UpdateUserForm;