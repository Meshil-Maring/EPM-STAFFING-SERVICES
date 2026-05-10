export function Page({ children, isLast = false }) {
  return (
    <div
      className={`relative flex flex-col bg-white ${isLast ? "" : "ea-page"}`}
      style={{ minHeight: "1122px" }}
    >
      {children}
    </div>
  );
}

export function TopBar() {
  return (
    <div className="h-2 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 shrink-0" />
  );
}

export function PageFooter({ pageNum }) {
  return (
    <div className="mt-auto border-t-2 border-orange-500 px-10 py-1.5 flex justify-end text-[11px] text-slate-500 font-sans">
      Page-{pageNum}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="text-center mx-4">
      <span className="inline-block w-36 border-b-[1.5px] border-slate-800" />
    </div>
  );
}

export function SectionHeading({ children }) {
  return (
    <h3 className="text-center font-bold text-[13px] mx-10 mt-2 mb-1 ea-serif">
      {children}
    </h3>
  );
}

export function Section({ children }) {
  return <div className="px-10 pt-0.5 pb-2">{children}</div>;
}

export function BodyText({ children, className = "" }) {
  return (
    <p
      className={`text-[12.5px] leading-[1.75] my-1.25 text-justify ea-serif ${className}`}
    >
      {children}
    </p>
  );
}

export function Underlined({ children }) {
  return <span className="underline">{children}</span>;
}

export function BulletItem({ children }) {
  return (
    <li className="text-[12.5px] leading-[1.75] mb-1 pl-1 text-justify ea-serif">
      {children}
    </li>
  );
}

export function SignatureLine({ label, value = "" }) {
  return (
    <p className="text-[12.5px] leading-[1.75] mb-3.5 underline ea-serif">
      {label} {value || "................................................"}
    </p>
  );
}
