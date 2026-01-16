import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/Image";
import Label from "../Components/common/Label";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import Signin_form from "../Components/layouts/SigningpagesLayouts/Signin_form";

function Signin() {
  return (
    <main className="grid pt-10 h-dvh grid-cols-1 md:grid-cols-2 w-full items-center justify-center relative bg-b_cream">
      <TopHeader />

      <section className="hidden md:flex flex-col items-center w-fit h-fit justify-center gap-4 m-auto">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          alt="Illustration of recruitment and professional growth"
          class_name="object-contain rounded-small h-80 w-auto"
          width="400"
          height="320"
        />
        <div className="flex flex-col gap-1">
          <Label
            as="h2"
            text="Your Professional Hub"
            class_name="font-semibold text-2xl text-center w-full text-text_b"
          />
          <Label
            as="p"
            text="Signin to explore and track progress, and receive expert recruitment support."
            class_name="font-normal text-sm max-w-sm text-center text-text_b_l"
          />
        </div>
      </section>

      <section className="flex items-center justify-center p-4">
        <Signin_form />
      </section>
    </main>
  );
}

export default Signin;
