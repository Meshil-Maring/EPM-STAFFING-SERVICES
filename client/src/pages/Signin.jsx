import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import Signin_form from "../Components/layouts/SigningpagesLayouts/Signin_form";
function Signin() {
  const head_styles = "text-2xl font-semibold w-full text-center";
  const sub_head_style = "text-sm font-lighter text-center w-full";
  const form_styles =
    "text-text_b font-poppins w-100 h-fit p-4 border border-border1 rounded-small flex flex-col items-center  trancking-wide text-md justify-start gap-4";

  const navigate = useNavigate();
  const handleSigningIn = (e) => {
    e.preventDefault();
    navigate("/Dashboard");
  };

  return (
    <section className="grid pt-10 h-dvh grid-cols-2 w-full items-center justify-center relative ">
      <TopHeader />
      <div className="flex flex-col items-center w-fit h-fit justify-center gap-2 m-auto">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          class_name="object-contain flex items-center justify-center rounded-small h-80 w-full"
        />
        <Label
          text="Your Professional Hub"
          class_name="font-semibold text-xl text-center w-full"
        />
        <Label
          text="Signin to explore and track progress, and receive expert recruitment support."
          class_name="font-lighter text-sm w-100 text-center"
        />
      </div>
      <Signin_form
        handle_form_submission={handleSigningIn}
        form_styles={form_styles}
        head_styles={head_styles}
        sub_head_style={sub_head_style}
      />
    </section>
  );
}

export default Signin;
