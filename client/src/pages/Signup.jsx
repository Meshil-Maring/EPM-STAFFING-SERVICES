import React from "react";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import Form from "../Components/layouts/SigningpagesLayouts/Form";

function Signup() {
  const handleSigningUp = (e) => {
    e.preventDefault();
    alert("form submitted successfully");
  };
  return (
    <div className="grid grid-cols-2 w-full h-full  items-center justify-center border border-border1 p-10 rounded-standard">
      <div className="flex items-start justify-center rounded-standard w-full h-full">
        <Form signin={false} handle_form_submission={handleSigningUp} />
      </div>
      <div className="flex flex-col items-center w-fit justify-center gap-2 mx-auto">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          class_name="object-cover flex items-center justify-center rounded-standard h-80 w-80"
        />
        <Label text="Create your account" class_name="font-semibold text-lg" />
        <Label
          text="Access tailored opportunities and expert recruitment support from EMP Services (OPC) private limited"
          class_name="font-lighter text-sm w-60 text-center"
        />
      </div>
    </div>
  );
}

export default Signup;
