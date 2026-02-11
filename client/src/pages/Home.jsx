import React from "react";
import HomeTopBar from "../Components/layouts/Home/HomeTopBar";
import HomeContentRight from "../Components/layouts/Home/HomeContentRight";
import HomeContentLeft from "../Components/layouts/Home/HomeContentLeft";
import Features from "../Components/layouts/Home/Features";
import GetStarted from "../Components/layouts/Home/GetStarted";
function Home() {
  return (
    <main className="w-full min-h-dvh font-poppins flex flex-col gap-8 md:gap-16 items-center justify-start text-text_b bg-b_cream">
      <h1 className="sr-only">Home - EPM Staffing Dashboard</h1>

      <HomeTopBar />

      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-6 px-4 max-w-7xl mx-auto"
        aria-labelledby="hero-content"
      >
        <h2 id="hero-content" className="sr-only">
          Main Dashboard Overview
        </h2>
        <div className="w-full h-full min-h-75">
          <HomeContentLeft />
        </div>
        <div className="w-full h-full min-h-75">
          <HomeContentRight />
        </div>
      </section>

      <section
        className="w-full flex flex-col items-center justify-start gap-8 px-4 py-6 max-w-7xl mx-auto"
        aria-labelledby="features-heading"
      >
        <header className="flex flex-col items-center justify-start gap-2 text-center">
          <h2
            id="features-heading"
            className="text-text_b_l text-2xl md:text-3xl font-semibold leading-tight tracking-tight"
          >
            Why Choose EPM Staffing?
          </h2>
          <p className="text-text_b_l text-lg md:text-xl font-light leading-tight opacity-80">
            Comprehensive solutions for modern recruitment needs
          </p>
        </header>
        <Features />
      </section>

      <section
        className="w-full flex items-center justify-center py-8"
        aria-label="Call to Action"
      >
        <GetStarted />
      </section>

      <footer className="p-8 w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 border-t border-light bg-white/50">
        <p className="uppercase font-asap text-lg font-bold tracking-widest text-text_b">
          EPM STAFFING SERVICES OPC PVT. LTD
        </p>
        <p className="text-sm font-light text-text_b_l">
          © 2026 EPM Staffing Services. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default Home;
