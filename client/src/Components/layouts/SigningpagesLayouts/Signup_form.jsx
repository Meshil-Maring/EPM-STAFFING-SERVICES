import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import display_data from "../../InputElements.json";
import Terms_Conditions from "./Terms_Conditions";
import Already_have_account from "./Already_have_account";
import Label from "../../common/Label";
import Signup_input from "./Signup_input";
import axios from "axios";

function Signup_form() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company_name: "",
    cin: "",
    location: "",
    email: "",
    phone: "",
    description: "",
    password: "",
    confirm_password: "",
    checkbox: false,
  });
  const [loading, setLoading] = useState(false);

  const elements = display_data["signup"];
  const keys = Object.keys(elements);

  const handleSigningup = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.keys(form).filter(
      (key) =>
        key !== "description" && (form[key] === "" || form[key] === false),
    );

    if (hasEmptyFields.length > 0)
      return toast.error("Fill all the required fields");

    if (form.password !== form.confirm_password)
      return toast.error("Passwords don't match");

    if (form.checkbox === false)
      return toast.warning("Read and Accept terms and conditions");

    setLoading(true);

    try {
      const path = "/api/auth/signup";
      const response = await axios.post(path, form);
      toast(response?.data?.message);
      if (response.status === 200) {
        toast.success("Account Created!");
        navigate("/api/auth/signin");
        return;
      }
      return toast.warning(response);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form
      onSubmit={(e) => handleSigningup(e)}
      className="w-fit bg-white mx-auto rounded-xl shadow-sm border border-gray-100 p-4 space-y-4"
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

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex flex-col items-center justify-start gap-4 w-full max-h-64 overflow-y-auto custom-scrollbar p-2">
        {keys.map((key) => (
          <Signup_input
            key={key}
            id={key}
            element={elements[key]}
            display_data={display_data}
            handleChange={handleChange}
          />
        ))}
      </div>

      <Terms_Conditions />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
      </button>

      <Already_have_account />
    </form>
  );
}

export default Signup_form;
