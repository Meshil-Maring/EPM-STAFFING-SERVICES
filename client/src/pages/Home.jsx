import React from "react";
import HomeTopBar from "../features/auth/pages/HomeTopBar";
import HomeContentRight from "../features/auth/pages/HomeContentRight";
import HomeContentLeft from "../features/auth/pages/HomeContentLeft";
import Features from "../features/auth/pages/Features";
import GetStarted from "../features/auth/pages/GetStarted";

function Home() {
  return (
    <main className="w-full min-h-dvh font-poppins flex flex-col items-center justify-start text-text_b bg-b_cream overflow-x-hidden">
      <h1 className="sr-only">Home - EPM Staffing Dashboard</h1>

      <HomeTopBar />

      {/* Hero */}
      <section
        className="relative w-full px-4 py-16 md:py-24"
        aria-labelledby="hero-content"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-16 w-125 h-125 bg-red rounded-full opacity-5 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-red rounded-full opacity-5 blur-2xl" />
        </div>
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl mx-auto">
          <h2 id="hero-content" className="sr-only">Main Dashboard Overview</h2>
          <HomeContentLeft />
          <HomeContentRight />
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4">
        <hr className="border-lighter" />
      </div>

      {/* Features */}
      <section
        className="w-full flex flex-col items-center gap-10 px-4 py-16 md:py-20 max-w-7xl mx-auto"
        aria-labelledby="features-heading"
      >
        <header className="flex flex-col items-center gap-3 text-center max-w-2xl">
          <span className="text-sm font-medium text-red bg-red-lighter border border-red/20 py-1 px-4 rounded-full">
            Platform Features
          </span>
          <h2
            id="features-heading"
            className="text-text_b text-2xl md:text-4xl font-bold leading-tight tracking-tight"
          >
            Why Choose EPM Staffing?
          </h2>
          <p className="text-text_b text-base md:text-lg leading-relaxed opacity-60">
            Comprehensive solutions for modern recruitment needs
          </p>
        </header>
        <Features />
      </section>

      {/* CTA */}
      <section className="w-full px-4 pb-16" aria-label="Call to Action">
        <GetStarted />
      </section>

      <footer className="w-full border-t border-lighter bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-asap text-sm font-bold tracking-widest text-text_b uppercase">
            EPM Staffing Services OPC PVT. LTD
          </p>
          <p className="text-xs text-light">
            © 2026 EPM Staffing Services. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
