import React from "react";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";
import Form from "../Components/layouts/SigningpagesLayouts/Form";

function Signin() {
  const handleSigningIn = (e) => {
    e.preventDefault();
    alert("form submitted successfully");
  };
  return (
    <div className="grid grid-cols-2 w-full h-fit  items-center justify-center border border-border1 p-6 rounded-standard">
      <div className="flex flex-col items-center w-fit justify-center gap-2 mx-auto">
        <Image
          link="https://i.ibb.co/dsVqx84R/Chat-GPT-Image-Nov-11-2025-12-02-35-AM-1.png"
          class_name="object-cover flex items-center justify-center rounded-standard h-80 w-80"
        />
        <Label
          text="Your Professional Hub"
          class_name="font-semibold text-lg"
        />
        <Label
          text="Signin to explore and track progress, and receive expert recruitment support."
          class_name="font-lighter text-sm w-60 text-center"
        />
      </div>
      <div className="flex items-start justify-center p-2 rounded-standard w-full h-full">
        <Form signin={true} handle_form_submission={handleSigningIn} />
      </div>
    </div>
  );
}

export default Signin;
