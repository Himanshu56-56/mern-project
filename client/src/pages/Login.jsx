import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL =  "http://localhost:5000/api/auth/login";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();


  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const res_data = await response.json();

    if (response.ok) {
      toast.success("Login Successful ✅");

      storeTokenInLS(res_data.token);
      setUser({ email: "", password: "" });

      navigate("/");
    } 
    else {
      // ✅ validation errors
      if (res_data.extraDetails) {
        const errorMessage = res_data.extraDetails
          .map(err => err.message)
          .join("\n");

        toast.error(errorMessage);
      } 
      // ✅ invalid credentials
      else {
        toast.error(res_data.msg || res_data.message);
      }
    }

  } catch (error) {
    console.log("Login error:", error);
  }
};


  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img src="/images/register.png" width="400" height="500" />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Login form</h1>

              <form onSubmit={handleSubmit}>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="email"
                  />
                </div>

                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="password"
                  />
                </div>

                <button type="submit" className="btn btn-submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
