import React from "react";

const Heading = () => {
  return (
    <div className="mb-5 flex flex-col gap-4 pb-1 sm:flex-row sm:items-center sm:gap-10">
      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Tax Optimisation
      </h1>

      <div className="relative flex items-center group">
        <button
          type="button"
          className="inline-flex items-center text-base font-medium text-blue-400 underline underline-offset-4 transition hover:text-blue-300 focus:outline-none focus-visible:text-blue-300 cursor-pointer"
        >
          How it works?
        </button>

        <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-4 w-[min(92vw,380px)] -translate-x-1/2 translate-y-2 rounded-2xl bg-neutral-100 p-4 text-left text-sm leading-6 text-neutral-900 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-5 sm:text-base">
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-neutral-100" />

          <ul className="list-disc space-y-2 pl-5">
            <li>See your capital gains for FY 2024-25 in the left card.</li>
            <li>
              Check boxes for assets you plan on selling to reduce your tax
              liability.
            </li>
            <li>Instantly see your updated tax liability in the right card.</li>
          </ul>

          <p className="mt-4">
            <span className="font-semibold">Pro tip:</span> Experiment with
            different combinations of your holdings to optimize your tax
            liability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
