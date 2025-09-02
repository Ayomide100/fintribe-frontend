import Image from "next/image";
import React from "react";
import logo from "../../../assets/fintribelogo.png";
import { BiArrowBack } from "react-icons/bi";
import { Handshake, Star, User } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";

const Select = () => {
  const roles = [
    {
      title: "Investor/User",
      description: "Want to explore and join opportunities.",
      icon: <User className="w-6 h-6 text-[#226B44]" />,
      subtitle: "user",
    },
    {
      title: "Guru/Expert",
      description: "Shares insights, builds credibility, leads circles.",
      icon: <Star className="w-6 h-6 text-[#226B44]" />,
      subtitle: "expert",
    },
    {
      title: "Partner/Business",
      description: "Posts vetted opportunities and partnerships.",
      icon: <Handshake className="w-6 h-6 text-[#226B44]" />,
      subtitle: "partner",
    },
  ];

  const nav = useRouter();

  const HandleRoleSelection = (role: string) => {
    localStorage.setItem("account_type", role);
    nav.push("/auth/register");
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title> FinTribe || Select</title>
      </Head>

      <div className="w-full h-screen flex flex-col">
        {/* Header */}
        <div className="w-full h-[10%]  flex justify-start items-center px-12">
          <Image
            src={logo}
            alt="logo"
            className="md:h-12 md:w-32 h-7 w-20  object-contain"
          />
        </div>

        {/* Title */}
        <div className="w-full h-[20%] px-5 md:px-0 flex flex-col justify-center items-center">
          <h1 className="text-black md:text-3xl text-xl font-bold">
            Whats Your Place in the{" "}
            <span className="text-[#226B44]">Tribe?</span>
          </h1>
          <p className="text-gray-400 text-center">
            Select the role that defines how you’ll thrive with us.
          </p>
        </div>

        {/* Role Cards */}
        <div className=" flex flex-col justify-between items-center">
          <div className="w-[90%] flex flex-col md:flex-row gap-6 justify-center items-center">
            {roles.map((role, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full md:w-[280px] h-[220px] flex flex-col justify-between items-center p-6 text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  {role.icon}
                  <h2 className="font-bold text-lg">{role.title}</h2>
                  <p className="text-gray-500 text-sm">{role.description}</p>
                </div>
                <button
                  onClick={() => HandleRoleSelection(role.subtitle)}
                  className="bg-[#0E1C36] text-white px-6 py-2 rounded-md hover:bg-[#226B44] transition-all"
                >
                  Join
                </button>
              </div>
            ))}
          </div>

          {/* Go Back */}
          <div
            className="w-full h-[10%] flex justify-center items-center py-4"
            onClick={() => nav.push("/")}
          >
            <p className="flex items-center gap-2 font-medium text-[#226B44] cursor-pointer">
              <BiArrowBack /> Go Back
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;
