import React from "react";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import Form from "../Components/layouts/SigningpagesLayouts/Form";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";

function Signup() {
  const handleSigningUp = (e) => {
    e.preventDefault();
    alert("form submitted successfully");
  };
  return (
    <div className="grid grid-cols-2 w-full p-8 mt-20 h-fit items-center justify-center rounded-small">
      <TopHeader />
      <div className="flex items-center justify-center rounded-small w-full h-full">
        <Form signin={false} handle_form_submission={handleSigningUp} />
      </div>
      <div className="flex flex-col items-center w-fit justify-center gap-2 mx-auto">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          class_name="object-contain flex items-center justify-center rounded-small h-100 w-100"
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
