import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import Image from "next/image";
import logo from "../../../assets/fintribelogo.png";

const Footer = () => {
  return (
    <footer className="bg-[#1F3B5A] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left: Logo & Description */}
          <div className="space-y-4 max-w-sm ">
            <Image
              src={logo}
              alt="FinTribe Logo"
              className="w-20 h-auto object-contain"
            />

            <p className="text-gray-300 text-sm leading-relaxed">
              Nigeria&apos;s premier social investment platform connecting
              investors with vetted opportunities and trusted expertise.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <MdWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Right: Platform + Support */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Platform Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Opportunities
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Investment Circles
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Learning Hub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Expert Gurus
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className=" mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 FinTribe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
