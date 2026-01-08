import React from "react";
import Signup_form from "./Signup_form";
import Signin_form from "./Signin_form";

function Form({
  signin = false,
  head_styles = "text-2xl font-semibold w-full text-center",
  sub_head_style = "text-sm font-lighter text-center w-full",
  form_styles = "text-text_b font-poppins w-100 h-fit p-4 border border-border1 rounded-small flex flex-col items-center justify-start gap-4",
  handle_form_submission,
}) {
  const section = signin ? "signin" : "signup";
  return section === "signin" ? (
    <Signin_form
      handle_form_submission={handle_form_submission}
      signin={signin}
      form_styles={form_styles}
      head_styles={head_styles}
      sub_head_style={sub_head_style}
    />
  ) : (
    <Signup_form
      handle_form_submission={handle_form_submission}
      signin={signin}
      form_styles={form_styles}
      head_styles={head_styles}
      sub_head_style={sub_head_style}
    />
  );
}

export default Form;
