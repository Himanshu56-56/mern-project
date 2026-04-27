import { useAuth } from "../store/auth";

export const Service = () => {
  const auth = useAuth();

  console.log("Auth Context:", auth);

  const services = auth?.services || [];

  console.log("Services Data 👉", services);


  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.length > 0 ? (
          services.map((curElem, index) => (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="/images/services.png"
                  alt="designer"
                  width="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{curElem.provider}</p>
                  <p>{curElem.price}</p>
                </div>

                <h2>{curElem.service}</h2>
                <p>{curElem.description}</p>
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ textAlign: "center" }}>
            Services loading...
          </h3>
        )}
      </div>
    </section>
  );
};
