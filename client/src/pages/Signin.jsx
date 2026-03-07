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
    <main className="h-dvh bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 space-y-2 ">
      <TopHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4 items-center h-fit rounded-xl overflow-hidden">
        {/* Visual Section */}
        <section className="hidden h-full lg:flex flex-col items-center justify-center relative">
          <Image
            link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
            alt="Professional recruitment and career growth illustration"
            class_name={
              "object-cover left-0 top-0 right-0 bottom-0 absolute inset-0 z-1 w-full h-full rounded-xl"
            }
          />

          <div className="text-center  z-2 rounded-xl p-4 text-text_white bg-b_cream/20 backdrop-blur-sm flex flex-col items-center justify-center">
            <Label
              as="h2"
              text="Welcome Back"
              class_name="font-bold text-2xl md:text-3xl tracking-tight"
            />
            <Label
              as="p"
              text="Sign in to access your dashboard and continue your professional journey with expert recruitment support."
              class_name="text-base md:text-lg leading-relaxed max-w-md"
            />
          </div>
        </section>

        {/* Form Section */}
        <section className="flex items-center justify-center">
          <Signin_form />
        </section>
      </div>
    </main>
  );
}

export default Signin;
