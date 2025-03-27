import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-5 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div>
          <h2 className="text-2xl font-bold">Ecomove</h2>
          <p className="text-gray-400 text-sm">Buy | Sell | Recycle | Donate</p>
        </div>

      
        <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
          <a href="/" className="hover:text-white transition duration-300">Home</a>
          <a href="/buy-sell" className="hover:text-white transition duration-300">Buy & Sell</a>
          <a href="/donate" className="hover:text-white transition duration-300">Donate</a>
          <a href="/recycle" className="hover:text-white transition duration-300">Recycle</a>
          <a href="/contact" className="hover:text-white transition duration-300">Contact Us</a>
        </div>

        
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm ">
        &copy; {new Date().getFullYear()} Ecomove. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
