import React from 'react';
import { Youtube, Globe, Linkedin, Instagram, Facebook } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';

const Button = ({ name }: { name: string }) => {
  const icons = {
    Youtube: Youtube,
    Website: Globe,
    Linkedin: Linkedin,
    Instagram: Instagram,
    Facebook: Facebook,
    Tiktok: FaTiktok,
  };

  const colors = {
    Youtube: "bg-red-600",
    Website: "bg-blue-500",
    Linkedin: "bg-blue-700",
    Instagram: "bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500",
    Facebook: "bg-blue-800",
    Tiktok: "bg-black",
  };

  const Icon = icons[name] || Globe;
  const bgColor = colors[name] || "bg-gray-700";

  return (
    <div className={`relative flex items-center justify-center w-12 h-12 cursor-pointer rounded-md transition-all duration-300 ${bgColor}`}>
      <div className="absolute inset-0 rounded-md -z-10 transition-transform duration-300 transform hover:rotate-35 hover:origin-bottom"></div>
      <div className="flex items-center justify-center w-full h-full bg-transparent border border-gray-500 rounded-md transition-all duration-300 backdrop-blur-sm hover:bg-gray-500 hover:bg-opacity-40">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default Button;
