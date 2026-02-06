import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import display_data from "../../InputElements.json";
import Terms_Conditions from "./Terms_Conditions";
import Already_have_account from "./Already_have_account";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Signup_input from "./Signup_input";
import { signup_form_data_context } from "../../../context/SigningupDataContext";
import axios from "axios";

function Signup_form({ form_styles, head_styles, sub_head_style }) {
  const navigate = useNavigate();
  const { form } = useContext(signup_form_data_context);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const elements = display_data["signup"];
  const keys = Object.keys(elements);

  const handleSigningup = async (e) => {
    e.preventDefault();
    console.log(form);
    const hasEmptyFields = Object.values(form).some(
      (value) => value === "" || value === false,
    );

    if (hasEmptyFields) {
      setError("All fields must be filled and terms accepted");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const path = "/api/auth/signup";
      const response = await axios.post(path, form);
      console.log("Success:", response.data);
      navigate("/api/auth/signin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSigningup} className={form_styles} noValidate>
      <header className="w-full flex flex-col gap-1">
        <Label text="Create Account" class_name={head_styles} />
        <Label
          as="p"
          text="Create your account and start your career journey"
          class_name={sub_head_style}
        />
      </header>

      {error && (
        <div role="alert" className="w-full py-1">
          <Label
            text={error}
            class_name="text-red-600 font-medium text-xs w-full text-center"
          />
        </div>
      )}

      <div className="flex flex-col p-1 items-center justify-start gap-4 w-full h-54 overflow-y-auto custom-scrollbar">
        {keys.map((key) => (
          <Signup_input
            key={key}
            id={key}
            element={elements[key]}
            display_data={display_data}
          />
        ))}
      </div>

      <Terms_Conditions />

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full text-text_white flex flex-row items-center relative justify-center rounded-small bg-nevy_blue overflow-hidden"
      >
        <Button
          text={loading ? "Processing..." : "Register Now"}
          type="submit"
          disabled={loading}
          class_name={`w-full py-2 font-semibold transition-opacity ${
            loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        />
      </motion.div>

      <Already_have_account />
    </form>
  );
}

export default Signup_form;
