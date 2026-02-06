import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/Image";
import Label from "../Components/common/Label";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import Signin_form from "../Components/layouts/SigningpagesLayouts/Signin_form";

/**
 * Signin Page Component
 * Renders authentication interface with professional gradient background and responsive layout
 */
function Signin() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <TopHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh] overflow-hidden">
          {/* Visual Section */}
          <section className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <Image
                  link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
                  alt="Professional recruitment and career growth illustration"
                  class_name="object-contain h-48 md:h-64 w-auto mx-auto"
                  width="400"
                  height="320"
                />
              </div>
            </div>

            <div className="text-center mt-6 md:mt-8 space-y-3 md:space-y-4">
              <Label
                as="h2"
                text="Welcome Back"
                class_name="font-bold text-2xl md:text-3xl text-gray-900 tracking-tight"
              />
              <Label
                as="p"
                text="Sign in to access your dashboard and continue your professional journey with expert recruitment support."
                class_name="text-gray-600 text-base md:text-lg leading-relaxed max-w-md"
              />
            </div>
          </section>

          {/* Form Section */}
          <section className="flex items-center justify-center">
            <Signin_form />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Signin;
