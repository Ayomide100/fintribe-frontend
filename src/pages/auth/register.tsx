import Image from "next/image";
import React from "react";
import herosect from "../../../assets/fintribe 1.png";

const Register = () => {
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      <div className="w-[60%] h-full"></div>
      <div className="w-[40%] h-full flex justify-center items-center">
        <Image
          src={herosect}
          alt="Description of image"
          className="w-[92%] h-[92%] object-cover rounded-2xl"
        />
        testing
      </div>
    </div>
  );
};

export default Register;
