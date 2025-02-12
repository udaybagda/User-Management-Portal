import { useEffect, useState } from "react";
import UserTable from "./Components/UserTable";
import Userform from "./Components/UserForm";
import UpdateUserForm from "./Components/UpdateUserForm";
import {ToastContainer, toast} from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers, addUser, deleteUser, updateUser } from "./services/api.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getUsers();
  }, []);

  // const handleAddUser = async (user) => {
  //   try {
  //     const newUser = await addUser(user);
  //     setUsers([...users, newUser]);
  //   } catch (error) {
  //     console.error("Failed to add user:", error);
  //   }
  // };

  const handleAddUser = async (user) => {
    try {
      const newUser = await addUser(user);
      setUsers([...users, newUser]);
  
      // Show success toast notification
      toast.success(`${newUser.name} added successfully! 🎉`, {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
  
    } catch (error) {
      console.error("Failed to add user:", error);
  
      // Show error toast
      toast.error("Failed to add user. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };
  

  // const handleDeleteUser = async (id, user) => {
  //   const confirmationPopup = confirm(
  //     "Are sure you want to delete " + user.name
  //   );
  //   if (confirmationPopup) {
  //     try {
  //       await deleteUser(id);
  //       setUsers(users.filter((user) => user.id !== id));
  //     } catch (error) {
  //       console.error("Failed to delete user:", error);
  //     }
  //   }
  // };

  // Using React Toast
  
  const handleDeleteUser = (id, user) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="text-gray-800 font-medium">
            Are you sure you want to delete <strong>{user.name}</strong>?
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={() => {
                deleteUser(id);
                setUsers(users.filter((u) => u.id !== id));
                toast.dismiss();
                toast.success(`${user.name} deleted successfully!`, { icon: "✅" });
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false, // Keep open until user interacts
        closeOnClick: false,
        draggable: false,
        pauseOnHover: true,
        theme: "colored",
        icon: "⚠️",
      }
    );
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsEditing(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUserToEdit(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        User Management Portal
      </h1>

      {isEditing ? (
        <UpdateUserForm
          userToEdit={userToEdit}
          onUpdateUser={handleUpdateUser}
          onCancel={handleCancelEdit}
        />
      ) : (
        <Userform addNewUser={handleAddUser} />
      )}

      <UserTable
        users={users}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleEdit}
      />

      {/*Toast container */}
      <ToastContainer /> 
    </div>
  );
}

export default App;