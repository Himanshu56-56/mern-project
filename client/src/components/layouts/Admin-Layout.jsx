import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const {user,isLoading} = useAuth();
  console.log("admin layout",user);

  if(isLoading){
    return<h1>Loading... </h1>
  }

  if(!user.isAdmin){
    return<Navigate to="/"/>
  }
  
  return (
    <>
      <header className="admin-header">
        <div className="admin-nav-container">
          <nav className="admin-nav">
            <ul className="admin-nav-links">

              <li>
                <NavLink to="/admin/users">
                  <FaUser /> <span>Users</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/contact">
                  <FaMessage /> <span>Contacts</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/service">
                  <FaRegListAlt /> <span>Services</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/">
                  <FaHome /> <span>Home</span>
                </NavLink>
              </li>

            </ul>
          </nav>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </>
  );
};
