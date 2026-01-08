import React from "react";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import Form from "../Components/layouts/SigningpagesLayouts/Form";
import { useNavigate } from "react-router-dom";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";

function Signin() {
  const navigate = useNavigate();
  const handleSigningIn = (e) => {
    e.preventDefault();
    navigate("/Dashboard");
  };

  return (
    <div className="grid p-10 mx-16 mt-26 grid-cols-2 w-full h-fit  items-center justify-center border border-border1 rounded-small">
      <TopHeader />
      <div className="flex flex-col items-center w-fit justify-center gap-2 mx-auto">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          class_name="object-contain flex items-center justify-center rounded-small h-100 w-100"
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
      <div className="flex items-start justify-center p-2 rounded-small w-full h-full">
        <Form signin={true} handle_form_submission={handleSigningIn} />
      </div>
    </div>
  );
}

export default Signin;
