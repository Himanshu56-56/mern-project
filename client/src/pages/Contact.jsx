import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user } = useAuth();

  // auto-fill after login
  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://mern-project-onz2.onrender.com/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* CONTACT FORM */}
      <section className="section-registration">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>

        <div className="container grid grid-two-cols">
          <div className="registration-image reg-img">
            <img src="/images/support.png" alt="always ready to help you" />
          </div>

          <div className="registration-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={data.message}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ✅ MAP SECTION (FOOTER KE UPAR) */}
      <section className="section-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};
