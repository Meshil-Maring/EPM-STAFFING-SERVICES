import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full h-dvh flex gap-8 items-center justify-center text-standard">
      <Link to={"/api/auth/signin"}>
        <buttton>Signin</buttton>
      </Link>
      <Link to={"/api/auth/signup"}>
        <button>Signup</button>
      </Link>
    </div>
  );
}

export default Home;
