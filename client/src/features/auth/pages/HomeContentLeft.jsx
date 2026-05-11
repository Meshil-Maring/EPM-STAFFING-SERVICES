import React from "react";

const stats = [
  { label: "Active Jobs", value: "500+" },
  { label: "Candidates", value: "1,200+" },
  { label: "Success Rate", value: "98%" },
];

function HomeContentLeft() {
  return (
    <article className="w-full flex flex-col items-start justify-center gap-7">
      <span className="text-sm font-medium text-red bg-red-lighter border border-red/20 py-1.5 px-4 rounded-full">
        Professional Staffing Solutions
      </span>

      <h2 className="text-text_b text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-xl">
        Find The{" "}
        <span className="text-red">Perfect Talent</span>{" "}
        Match
      </h2>

      <p className="text-text_b opacity-60 text-base md:text-lg leading-relaxed max-w-lg">
        Transform your hiring process with our comprehensive staffing platform.
        Manage jobs, track offers, and streamline your interview pipeline all in
        one place.
      </p>

      <div className="w-full md:w-4/5 grid grid-cols-3 gap-6 pt-6 border-t border-lighter">
        {stats.map((item) => (
          <div key={item.label} className="flex flex-col items-start gap-0.5">
            <span className="text-2xl md:text-3xl font-bold text-red">
              {item.value}
            </span>
            <span className="text-xs uppercase tracking-wider font-medium text-text_b opacity-50">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default HomeContentLeft;
