import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";

function AuthLoadingScreen() {
  return (
    <div className="relative min-h-screen w-full bg-[#f8f7f4] flex items-center justify-center overflow-hidden font-sans">

      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Green ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(99,153,34,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Spinner */}
        <div className="relative w-[72px] h-[72px]">
          <style>{`
            @keyframes spinCW  { to { transform: rotate(360deg);  } }
            @keyframes spinCCW { to { transform: rotate(-360deg); } }
            @keyframes dotPulse {
              0%, 100% { opacity: 1;   transform: scale(1);    }
              50%       { opacity: 0.4; transform: scale(0.65); }
            }
            @keyframes dotBounce {
              0%, 80%, 100% { opacity: 0.25; transform: scale(1);    }
              40%           { opacity: 1;    transform: scale(1.45); }
            }
            .spin-cw  { animation: spinCW  1.2s linear infinite; }
            .spin-ccw { animation: spinCCW 1.8s linear infinite; }
            .dot-pulse  { animation: dotPulse  1.2s ease-in-out infinite; }
            .dot-bounce { animation: dotBounce 1.4s ease-in-out infinite; }
          `}</style>

          {/* Outer ring */}
          <div
            className="spin-cw absolute inset-0 rounded-full"
            style={{ border: "2px solid #e4e2db", borderTopColor: "#639922" }}
          />
          {/* Inner ring */}
          <div
            className="spin-ccw absolute rounded-full"
            style={{
              inset: 9,
              border: "1.5px solid #ebe9e2",
              borderTopColor: "rgba(99,153,34,0.35)",
            }}
          />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="dot-pulse w-[9px] h-[9px] rounded-full"
              style={{ background: "#639922" }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-[7px] text-center">
          <p className="text-[15px] font-medium tracking-[0.01em] text-[#1c1c1a]">
            Verifying your session
          </p>
          <p className="text-[12.5px] font-light tracking-[0.04em] text-[#888780]">
            Please wait a moment
          </p>

          {/* Bouncing dots */}
          <div className="flex gap-1.5 mt-1">
            {[0, 0.2, 0.4].map((delay, i) => (
              <div
                key={i}
                className="dot-bounce w-1 h-1 rounded-full"
                style={{ background: "#639922", animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <AuthLoadingScreen />;

  if (!user || user.role !== "user") {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
}

export default ClientRoutes;