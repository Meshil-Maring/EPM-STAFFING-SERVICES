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
import { log_state } from "../../../context/LogState";
import { showError, showInfo, showSuccess } from "../../../utils/toastUtils";
import Icon from "../../common/Icon";
import TopHeader from "./TopHeader";

function Signin_form() {
  const { setLog } = useContext(log_state);
  const { save_company_accounts } = useContext(Company_context);
  const { save_admin_accounts } = useContext(admin_accounts_context);
  // Form styling classes for professional appearance
  const head_styles = "text-2xl font-bold w-full text-center text-gray-900";
  const sub_head_style = "text-sm font-medium text-center w-full text-gray-600";
  const form_styles =
    "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 w-[80%] sm:w-[60%] md:w-[55%] lg:w-[40%]";

  // --- Hooks and Contexts ---
  const navigate = useNavigate();

  // Local state for handling login error messages
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Load dummy data into context instead of fetching from backend
  const loadData = (user_type) => {
    // Load company accounts from dummy data
    save_company_accounts(Accounts);

    // Load admin accounts from dummy data if user is admin
    if (user_type === "admin") {
      save_admin_accounts(AdminAccounts);
    }
  };

  // --- Authentication Handler ---
  const handle_form_submission = (e) => {
    e.preventDefault(); // Stop page refresh

    if (!form.email) return showError("Email missing!");
    if (!form.password) return showError("Password missing!");

    // Authenticate using dummy data
    const { email, password } = form;

    // Check admin accounts first
    const admin_key = Object.keys(AdminAccounts).find(
      (key) =>
        AdminAccounts[key].email === email &&
        AdminAccounts[key].password === password,
    );

    const adminUser = AdminAccounts[admin_key];

    if (adminUser) {
      showSuccess("Welcome!");
      setLog(true);
      sessionStorage.setItem("current_navbutton", "client_management");
      sessionStorage.setItem("logged_user_type", "admin");
      sessionStorage.setItem("logged_user_id", admin_key);
      // Clear any leftover signup form data when logging in
      loadData("admin");
      navigate("/admin/management");
      setForm({ email: "", password: "" });
      return;
    }

    // Check company accounts

    const user_key = Object.keys(Accounts).find(
      (key) =>
        Accounts[key].email === email && Accounts[key].password === password,
    );
    const companyUser = Accounts[user_key];

    if (companyUser) {
      showSuccess("Welcome!");
      setLog(true);
      sessionStorage.setItem("current_navbutton", "jobs");
      sessionStorage.setItem("logged_user_type", "company");
      sessionStorage.setItem("logged_user_id", user_key);
      // Clear any leftover signup form data when logging in
      loadData("company");
      navigate("/client/dashboard");
      setForm({ email: "", password: "" });
      return;
    }

    // Authentication failed
    showError("Invalid credentials!");
  };

  // --- Auxiliary Button Handler ---
  const handleClicking = (name) => {
    if (name === "Sign up") return navigate("/auth/signup_form");
    return showInfo("Not yet implemented");
  };

  // Form filling
  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Pulling structure for input fields from the JSON config
  const elements = display_data["Signin"];
  const keys = Object.keys(elements);

  return (
    <div className="w-full h-dvh flex flex-col pt-14 gap-4 items-center justify-center">
      <TopHeader />
      <form onSubmit={(e) => handle_form_submission(e)} className={form_styles}>
        <header className="flex flex-col gap-2 w-full">
          <Label text="Welcome back!" class_name={head_styles} />
          <Label
            text="Access your account and continue your journey with EPM Staffing Services"
            class_name={sub_head_style}
          />
        </header>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="w-full flex flex-col gap-4">
            {/* Mapping through keys to render Email and Password inputs */}
            {keys.map((key) => (
              <Signin_input
                key={key}
                element={elements[key]}
                display_data={display_data}
                handleInputChange={handleInputChange}
              />
            ))}
          </div>

          {/* Forgot Password Link styled as a Button */}
          <Button
            onclick={handleClicking}
            text="Forgot password?"
            type="button"
            class_name="border-none hover:text-blue-700 transition-colors text-nevy_blue text-sm font-medium ml-auto cursor-pointer p-0"
            aria-label="Recover forgotten password"
          />
        </div>

        {/* Main Submit Action */}
        <div className="w-full transition-all ease-in-out duration-150 hover:scale-[1.02] text-text_white flex flex-row items-center relative justify-center rounded-small bg-g_btn overflow-hidden">
          <button
            className="w-full flex items-center justify-center"
            type="submit"
          >
            <Label
              text="Login"
              class_name="cursor-pointer text-center p-2 text-lg font-semibold"
            />
            <Icon icon={"ri-arrow-right-line"} />
          </button>
        </div>

        {/* Footer: Redirection to Signup and Clear Form */}
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
