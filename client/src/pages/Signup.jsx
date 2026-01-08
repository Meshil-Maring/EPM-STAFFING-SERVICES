import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import Form from "../Components/layouts/SigningpagesLayouts/Form";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";

function Signup() {
  const navigate = useNavigate();
  const handleSigningUp = (e) => {
    e.preventDefault();
    alert("form submitted successfully");
    navigate("/api/auth/signin");
  };
  return (
    <div className="grid pt-10 h-dvh grid-cols-2 w-full items-center justify-center relative ">
      <TopHeader />

      <div className="flex items-center justify-center p-2 rounded-small w-fit h-fit m-auto">
        <Form signin={false} handle_form_submission={handleSigningUp} />
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
    </div>
  );
}

export default Signup;
