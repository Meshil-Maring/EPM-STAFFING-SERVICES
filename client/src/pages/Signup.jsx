import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/Image";
import Label from "../Components/common/Label";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import Signup_form from "../Components/layouts/SigningpagesLayouts/Signup_form";

/**
 * Signup Page Component
 * Renders registration form with professional gradient background and responsive grid layout
 */
function Signup() {
  const navigate = useNavigate();

  const handleSigningUp = (e) => {
    e.preventDefault();
    // In a real app, you'd handle registration logic here
    navigate("/auth/signin");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <TopHeader />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[85vh] overflow-hidden">
          {/* Form Section */}
          <section className="flex items-center justify-center order-2 lg:order-1">
            <Signup_form />
          </section>

          {/* Visual Section */}
          <section className="hidden lg:flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <Image
                  link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
                  alt="Professional networking and career growth illustration"
                  class_name="object-contain h-48 md:h-64 w-auto mx-auto"
                  width="400"
                  height="320"
                />
              </div>
            </div>

            <div className="text-center mt-6 md:mt-8 space-y-3 md:space-y-4">
              <Label
                as="h2"
                text="Join Our Professional Community"
                class_name="font-bold text-2xl md:text-3xl text-gray-900 tracking-tight"
              />
              <Label
                as="p"
                text="Create your account to access tailored opportunities and expert recruitment support from EMP Services (OPC) Private Limited."
                class_name="text-gray-600 text-base md:text-lg leading-relaxed max-w-md"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Signup;
