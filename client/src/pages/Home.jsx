export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome to Gohar Technical</h1>
              <p>
                Are you ready  to take your bussinesto the next level
                with cutting-edge IT Solution? Look no further! At Gohat Technoical,
                we specialize in providing  inovative  IT Service  and solution tailored  to meet  
                your unique needs.
              </p>
              <div className="btn-btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
            {/* hero image */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}

      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>Registered Company</p>
          </div>
           <div className="div1">
            <h2>100,00+</h2>
            <p>Happy Clients</p>
          </div>
           <div className="div1">
            <h2>500+</h2>
            <p>Well Known Developers</p>
          </div>
           <div className="div1">
            <h2>24/7</h2>
            <p>Service</p>
          </div>
        </div>
      </section>

      {/* 3rd section */}
      <section className="section-hero">
          <div className="container grid grid-two-cols">
            {/* hero image */}
            <div className="hero-image">
              <img
                src="/images/design.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
            <div className="hero-content">
              <p>We are here to hep you</p>
              <h1>Get Started Today</h1>
              <p>
               Ready to take the first step towords a more efficient and secure
               It infrastructure? Contact us today for a free consultation and
               let's discuss how Gohar Technical can help your bussiness thrive in the 
               digital age.
              </p>
              <div className="btn-btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};
