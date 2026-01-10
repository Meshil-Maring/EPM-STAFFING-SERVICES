import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import Signup_form from "../Components/layouts/SigningpagesLayouts/Signup_form";
function Signup() {
  const navigate = useNavigate();
  const handleSigningUp = (e) => {
    e.preventDefault();
    alert("form submitted successfully");
    navigate("/api/auth/signin");
  };

  const head_styles = "text-2xl font-semibold w-full text-center";
  const sub_head_style = "text-sm font-lighter text-center w-full";
  const form_styles =
    "text-text_b font-poppins w-100 h-fit p-4 border border-border1 rounded-small flex flex-col items-center  trancking-wide text-md justify-start gap-4";

  return (
    <section className="grid pt-10 h-dvh grid-cols-2 w-full items-center justify-center relative ">
      <TopHeader />

      <div className="flex items-center justify-center p-2 rounded-small w-fit h-fit m-auto">
        <Signup_form
          handle_form_submission={handleSigningUp}
          form_styles={form_styles}
          head_styles={head_styles}
          sub_head_style={sub_head_style}
        />
      </div>
      <div className="flex flex-col items-center w-fit h-fit justify-center gap-2 m-auto">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          class_name="object-contain flex items-center justify-center rounded-small h-80 w-100"
        />
        <Label text="Create your account" class_name="font-semibold text-xl" />
        <Label
          text="Access tailored opportunities and expert recruitment support from EMP Services (OPC) private limited"
          class_name="font-lighter text-sm tracking-wide w-100 text-center"
        />
      </div>
    </section>
  );
}

export default Signup;
