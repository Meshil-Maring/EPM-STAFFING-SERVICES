import React from "react";
import Image from "../Components/common/Image";
import Label from "../Components/common/Label";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import Signup_form from "../Components/layouts/SigningpagesLayouts/Signup_form";

function Signup() {
  return (
    <main className="h-dvh space-y-2 bg-linear-to-br from-slate-50 via-indigo-50 to-blue-50">
      <TopHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center p-4">
        {/* Form Section */}
        <Signup_form />

        {/* Visual Section */}
        <section className="hidden lg:flex h-full items-center justify-center relative ">
          <Image
            link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
            alt="Professional networking and career growth illustration"
            class_name={
              "object-cover left-0 top-0 right-0 bottom-0 absolute inset-0 z-1 w-full h-full rounded-xl"
            }
          />

          <div className="text-center z-2 bg-b_cream/20 p-4 rounded-xl backdrop-blur-sm text-gray-200">
            <Label
              text="Join Our Professional Community"
              class_name="font-bold text-2xl md:text-3xl tracking-tight"
            />
            <Label
              text="Create your account to access tailored opportunities and expert recruitment support from EMP Services (OPC) Private Limited."
              class_name="text-base md:text-lg leading-relaxed max-w-md"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;
