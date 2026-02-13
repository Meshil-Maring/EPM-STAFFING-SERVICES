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

/**
 * Signup Form Component
 * Handles user registration with form validation, API integration, and loading states
 */
function Signup_form() {
  const navigate = useNavigate();
  const { form } = useContext(signup_form_data_context);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const elements = display_data["signup"];
  const keys = Object.keys(elements);

  const handleSigningup = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.keys(form).filter(
      (key) =>
        key !== "description" && (form[key] === "" || form[key] === false),
    );

    if (hasEmptyFields.length > 0) {
      setError("All fields must be filled and terms accepted");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // const path = "/api/auth/signup";
      // const response = await axios.post(path, form);
      // console.log("Success:", response.data);
      navigate("/api/auth/signin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSigningup}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6"
      noValidate
    >
      <header className="w-full flex flex-col gap-2">
        <Label
          text="Create Account"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label
          as="p"
          text="Create your account and start your career journey"
          class_name="text-sm font-medium text-gray-600 text-center"
        />
      </header>

      {error && (
        <div role="alert" className="w-full py-2">
          <Label
            text={error}
            class_name="text-red-600 font-medium text-sm text-center bg-red-50 border border-red-100 rounded-lg py-2 px-4"
          />
        </div>
      )}

      <div className="flex flex-col items-center justify-start gap-4 w-full max-h-64 overflow-y-auto custom-scrollbar p-2">
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

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          "Register Now"
        )}
      </motion.button>

      <Already_have_account />
    </form>
  );
}

export default Signup_form;
