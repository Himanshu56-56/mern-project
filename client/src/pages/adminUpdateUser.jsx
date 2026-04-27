import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdateUser = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // ================= GET SINGLE USER =================
  const getSingleUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      setUser(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  // ================= INPUT HANDLE =================
  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // ================= UPDATE USER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        toast.success("User Updated Successfully ✅");
        navigate("/admin/users");
      } else {
        toast.error("Update Failed ❌");
      }

    } catch (error) {
      console.log(error);
    }
  };

  // ================= UI =================
  return (
    <section className="admin-update-section">
      <div className="admin-update-container">

        <h1>Edit User</h1>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Name</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInput}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInput}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInput}
            />
          </div>

          <button type="submit" className="btn">
            Update User
          </button>

        </form>
      </div>
    </section>
  );
};
