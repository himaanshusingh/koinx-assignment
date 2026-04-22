import React, { useState } from "react";
import { ChevronUp, Info } from "lucide-react";

const Accordian = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5 w-full rounded-2xl border border-blue-500/60 bg-[#13224b] text-white shadow-[0_0_0_1px_rgba(59,130,246,0.08)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mb-1 flex w-full items-start justify-between gap-4 p-3 text-left sm:p-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400 sm:h-6 sm:w-6" />
          <h2 className="text-sm font-semibold leading-snug sm:text-[20px]">
            Important Notes And Disclaimers
          </h2>
        </div>

        <ChevronUp
          className={`mt-1 h-5 w-5 shrink-0 text-slate-300 transition-transform duration-300 ${
            open ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-white/95 marker:text-white/70 sm:text-base sm:leading-7">
              <li>
                <span className="font-semibold">Price Source Disclaimer:</span>
                &nbsp; Please note that the current price of your coins may
                differ from the prices listed on specific exchanges. This is
                because we use
                <span className="font-semibold">CoinGecko</span> as our default
                price source for certain exchanges, rather than fetching prices
                directly from the exchange.
              </li>

              <li>
                <span className="font-semibold">
                  Country-specific Availability:
                </span>
                &nbsp; Tax loss harvesting may
                <span className="font-semibold">not be supported</span> in all
                countries. We strongly recommend consulting with your local tax
                advisor or accountant before performing any related actions on
                your exchange.
              </li>

              <li>
                <span className="font-semibold">Utilization of Losses:</span>
                &nbsp; Tax loss harvesting typically allows you to offset
                capital gains. However, if you have
                <span className="font-semibold">
                  zero or no applicable crypto capital gains
                </span>
                , the usability of these harvested losses may be limited. Kindly
                confirm with your tax advisor how such losses can be applied in
                your situation.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
