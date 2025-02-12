import PropTypes from "prop-types";

const UserTable = ({ users = [], onDeleteUser, onUpdateUser }) => {
    return (
      <div className="max-w-4xl mx-auto mt-6 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          User List
        </h2>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 border-b text-left">ID</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Role</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 border-b">{user.id}</td>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.role}</td>
                  <td className="py-3 px-4 border-b flex justify-center space-x-2">
                    <button
                      onClick={() => onUpdateUser(user)}
                      className="bg-fuchsia-500 text-white px-3 py-1 rounded hover:bg-fuchsia-800 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id,user)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-800 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  UserTable.propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      })
    ),
    onDeleteUser: PropTypes.func.isRequired,
    onUpdateUser: PropTypes.func.isRequired,
  };

  export default UserTable;
  