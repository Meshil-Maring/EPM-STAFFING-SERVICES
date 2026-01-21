import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/Image";
import Label from "../Components/common/Label";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import Signup_form from "../Components/layouts/SigningpagesLayouts/Signup_form";

function Signup() {
  const navigate = useNavigate();

  const handleSigningUp = (e) => {
    e.preventDefault();
    // In a real app, you'd handle registration logic here
    navigate("/auth/signin");
  };

  const head_styles = "text-2xl font-semibold w-full text-center text-text_b";
  const sub_head_style = "text-sm font-normal text-center w-full text-text_b_l";
  const form_styles =
    "text-text_b font-poppins w-100 h-full p-6 border border-border1 rounded-small flex flex-col items-center tracking-wide text-md justify-start gap-2 bg-white shadow-sm";

  return (
    <main className="grid pt-10 h-screen grid-cols-1 md:grid-cols-2 w-full items-center justify-center relative bg-b_cream">
      <TopHeader />

      <section className="flex items-center justify-center p-4 order-2 h-120 md:order-1">
        <Signup_form
          handle_form_submission={handleSigningUp}
          form_styles={form_styles}
          head_styles={head_styles}
          sub_head_style={sub_head_style}
        />
      </section>

      <section className="hidden md:flex flex-col items-center w-fit h-fit justify-center gap-4 m-auto order-1 md:order-2">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          alt="Illustration representing professional networking and career growth"
          class_name="object-contain rounded-small h-80 w-auto"
          width="400"
          height="320"
        />
        <div className="flex flex-col gap-1 items-center">
          <Label
            as="h2"
            text="Create your account"
            class_name="font-semibold text-2xl text-text_b"
          />
          <Label
            as="p"
            text="Access tailored opportunities and expert recruitment support from EMP Services (OPC) private limited"
            class_name="font-normal text-sm tracking-wide max-w-sm text-center text-text_b_l"
          />
        </div>
      </section>
    </main>
  );
}

export default Signup;
