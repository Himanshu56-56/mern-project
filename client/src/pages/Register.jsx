import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "https://mern-project-onz2.onrender.com/api/auth/register";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  // ================= INPUT HANDLE =================
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // ================= FORM SUBMIT =================
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

      // ✅ SUCCESS CASE
      if (response.ok) {
        console.log("Register Success ✅", res_data);

        storeTokenInLS(res_data.token);

        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
           toast.success("Registration Successful")
        navigate("/"); // homepage redirect
      }

      // ❌ ERROR CASE
      else {
        console.log("Server Error ❌", res_data);

        // Zod validation errors (422)
        if (res_data.extraDetails) {
          const errorMessages = res_data.extraDetails
            .map((err) => err.message)
            .join("\n");

          toast.error(errorMessages);
        }

        // email already exists / other errors (400)
        else {
          toast.error(res_data.msg || res_data.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.log("register error:", error);
      toast.error("Server not responding");
    }
  };

  // ================= UI =================
  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">

            <div className="registration-image reg-img">
              <img
                src="/images/register.png"
                alt="register"
                width="400"
                height="500"
              />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration Form</h1>

              <form onSubmit={handleSubmit}>

                <div>
                  <label>username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="username"
                  />
                </div>

                <div>
                  <label>email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="email"
                  />
                </div>

                <div>
                  <label>phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="phone"
                  />
                </div>

                <div>
                  <label>password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="password"
                  />
                </div>

                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>

              </form>
            </div>

          </div>
        </div>
      </main>
    </section>
  );
};
