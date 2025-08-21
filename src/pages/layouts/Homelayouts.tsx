import React, { ReactNode } from "react";
import Header from "../(components)/Header";
import PropTypes from "prop-types";
import Footer from "../(components)/Footer";

interface MainlayoutProps {
  children: ReactNode;
}

const Homelayouts: React.FC<MainlayoutProps> = ({ children }) => {
  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="w-full h-auto bg-green-400">{children}</div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};
Homelayouts.propTypes = {
  children: PropTypes.node,
};

export default Homelayouts;
