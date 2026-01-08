import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import Form from "../Components/layouts/SigningpagesLayouts/Form";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";

function Signin() {
  const navigate = useNavigate();
  const handleSigningIn = (e) => {
    e.preventDefault();
    navigate("/Dashboard");
  };

  return (
    <div className="grid pt-10 h-dvh grid-cols-2 w-full items-center justify-center relative ">
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
      <div className="flex items-center justify-center p-2 rounded-small w-fit h-fit m-auto">
        <Form signin={true} handle_form_submission={handleSigningIn} />
      </div>
    </div>
  );
}

export default Signin;
