import React, { useState, useContext, useEffect } from "react";
import Signin_input from "./Signin_input";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { Company_context } from "../../../context/AccountsContext";
import { admin_accounts_context } from "../../../context/AdminAccountsContext";
import Accounts from "../../dummy_data_structures/Accounts.json";
import AdminAccounts from "../../dummy_data_structures/AdminAccounts.json";
import { showError, showInfo, showSuccess } from "../../../utils/toastUtils";
import Icon from "../../common/Icon";
import TopHeader from "./TopHeader";

import { loginService } from "../../../services/user.service.js";

function Signin_form() {
  const { save_company_accounts } = useContext(Company_context);
  const { save_admin_accounts } = useContext(admin_accounts_context);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // NEW: loading state
  const [loading, setLoading] = useState(false);

  const loadData = (user_type) => {
    save_company_accounts(Accounts);
    if (user_type === "admin") {
      save_admin_accounts(AdminAccounts);
    }
  };

  const handle_form_submission = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent multiple clicks

    if (!form.email) return showError("Email missing!");
    if (!form.password) return showError("Password missing!");

    try {
      setLoading(true);

      const { email, password } = form;
      const result = await loginService(email, password);

      if (!result.success) {
        return showError(result.message);
      }

      if (result.data.role === "user") {
        navigate("/client/dashboard");
      } else if (result.data.role === "admin") {
        navigate("/admin/management");
        console.log(result.data.role);
      }

      showSuccess(result.message);
    } catch (err) {
      showError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleClicking = (name) => {
    if (name === "Sign up") return navigate("/auth/signup_form");
    return showInfo("Not yet implemented");
  };

  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const elements = display_data["Signin"];
  const keys = Object.keys(elements);

  return (
    <div className="w-full h-dvh flex flex-col pt-14 gap-4 items-center justify-center">
      <TopHeader />
      <form
        onSubmit={(e) => handle_form_submission(e)}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 w-[80%] sm:w-[60%] md:w-[55%] lg:w-[40%]"
      >
        <header className="flex flex-col gap-2 w-full">
          <Label
            text="Welcome back!"
            class_name="text-2xl font-bold w-full text-center text-gray-900"
          />
          <Label
            text="Access your account and continue your journey with EPM Staffing Services"
            class_name="text-sm font-medium text-center w-full text-gray-600"
          />
        </header>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="w-full flex flex-col gap-4">
            {keys.map((key) => (
              <Signin_input
                key={key}
                element={elements[key]}
                display_data={display_data}
                handleInputChange={handleInputChange}
              />
            ))}
          </div>

          <Button
            onclick={handleClicking}
            text="Forgot password?"
            type="button"
            class_name="border-none hover:text-blue-700 transition-colors text-nevy_blue text-sm font-medium ml-auto cursor-pointer p-0"
          />
        </div>

        {/* Submit Button with loading control */}
        <div className="w-full transition-all ease-in-out duration-150 hover:scale-[1.02] text-text_white flex flex-row items-center relative justify-center rounded-small bg-g_btn overflow-hidden">
          <button
            className={`w-full flex items-center justify-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            <Label
              text={loading ? "Logging in..." : "Login"}
              class_name="cursor-pointer text-center p-2 text-lg font-semibold"
            />
            <Icon icon={"ri-arrow-right-line"} />
          </button>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 w-full pt-2">
          <Label text="Don't have an account yet?" class_name="text-sm" />
          <Button
            type={"button"}
            text={"Sign up"}
            onclick={handleClicking}
            class_name="font-semibold text-nevy_blue border-b border-nevy_blue hover:text-blue-700 transition-colors"
          />
        </div>
      </form>
    </div>
  );
}

export default Signin_form;
