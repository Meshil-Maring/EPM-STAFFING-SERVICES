import Icon from "../../../shared/components/ui/Icon";
import { useNavigate } from "react-router-dom";

function GetStarted() {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-5xl mx-auto" aria-labelledby="cta-heading">
      <div className="relative overflow-hidden rounded-large p-10 md:p-16 flex flex-col items-center gap-6 text-center bg-linear-to-br from-red to-red-dark shadow-lg shadow-red/20">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />

        <header className="relative flex flex-col gap-3 max-w-2xl">
          <h2
            id="cta-heading"
            className="text-2xl md:text-4xl font-bold text-white tracking-tight"
          >
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            Join hundreds of companies using EPM Staffing Services to build
            their dream teams.
          </p>
        </header>

        <button
          onClick={() => navigate("/auth/signup_form")}
          className="relative group flex items-center gap-2 px-8 py-3 bg-white text-red font-bold rounded-small shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 text-base"
        >
          Get Started Now
          <Icon
            icon="ri-arrow-right-line"
            class_name="transition-transform group-hover:translate-x-1 text-base"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}

export default GetStarted;
