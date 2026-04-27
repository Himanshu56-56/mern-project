import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="section-footer">
      <div className="container grid grid-four-cols">
        
        {/* Column 1 */}
        <div className="footer-about">
          <h2>Gohar Technical</h2>
          <p>
            We are the world best IT company providing innovative solutions
            to grow your business digitally.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/service">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-services">
          <h3>Services</h3>
          <ul>
            <li>Web Development</li>
            <li>App Development</li>
            <li>UI/UX Design</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@gohartechnical.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Gohar Technical. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
