export default function DocumentHeader({ documentNumber }) {
  return (
    <>
      <header className="flex items-center px-10 pt-5 pb-3 gap-6">
        {/* Logo placeholder */}
        <div className="w-20 h-20 rounded-lg bg-slate-100 border-2 border-dashed border-slate-400 flex items-center justify-center shrink-0 text-slate-500 text-[10px] text-center font-sans leading-tight">
          EPM
          <br />
          Logo
        </div>

        <div className="flex-1 text-center">
          <h1 className="m-0 text-[22px] font-black tracking-wide text-slate-900 uppercase">
            EPM Staffing Services (OPC) Pvt. Ltd.
          </h1>
          <p className="mt-1 text-base italic font-bold text-slate-900">
            Talent Delivered
          </p>
        </div>

        <div className="text-[11px] leading-[1.9] text-slate-900 text-right shrink-0">
          <div>📞 +91 9862279597</div>
          <div>✉ admin@epmstaffingservices.com</div>
          <div>✉ careerepmstaffingservices@gmail.com</div>
        </div>
      </header>

      <div className="h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mb-1" />

      <div className="px-10 pt-1 pb-2.5 text-[11px] text-slate-900">
        <span>Imphal, Manipur – 795001</span>
        <span className="ml-8">CIN: U78100MN2025OPC015365</span>
      </div>

      <div className="px-10 pb-1.5 text-[11.5px] font-bold">
        No. {documentNumber}
      </div>

      <h2 className="text-center underline text-base font-black mx-10 my-2.5 tracking-wide">
        COMMERCIAL EMPANELMENT AGREEMENT
      </h2>
    </>
  );
}
