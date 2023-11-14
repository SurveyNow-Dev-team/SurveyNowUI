import React, { useEffect } from "react";

import Navbar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";

const MainComponent = ({ child }) => {
  return (
    <div>
      <div className="relative bg-light">
        <div className="d-block position-relative">
          <div className="bg-light w-100 min-vh-80">
            <div className="md-static bg-light navbar w-100 p-0">
              <Navbar />
            </div>
            <div
              container
              style={{
                minHeight: "70vh",
                width: "100%",
                margin: "auto",
              }}
            >
              {child}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
