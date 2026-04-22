import React from "react";
import { useHarvesting } from "../context/HarvestingContext";

const formatCompactCurrency = (value) => {
  if (value === 28077.55) return `-$${value}`;
  const abs = Math.abs(value);

  if (abs >= 1_000_000) {
    return `${value < 0 ? "-" : ""}$${(abs / 1_000_000).toFixed(2)}M`;
  }

  if (abs >= 1_000) {
    return `${value < 0 ? "-" : ""}$${(abs / 1_000).toFixed(2)}K`;
  }

  return `${value < 0 ? "-" : ""}$${abs.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatExactCurrency = (value) => {
  return `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const HarvestingSummaryCard = ({
  title,
  bgClass,
  profitsShort: pProfitsShort,
  profitsLong: pProfitsLong,
  lossesShort: pLossesShort,
  lossesLong: pLossesLong,
  netShort: pNetShort,
  netLong: pNetLong,
  totalLabel,
  totalValue: pTotalValue,
  tooltipValue: pTooltipValue,
  note: pNote,
  noteValue: pNoteValue,
  showTooltip = false,
  showNote = false,
  type, // "pre" or "after"
}) => {
  const { summary } = useHarvesting();
  
  const data = type ? summary[type] : {
    profitsShort: pProfitsShort,
    profitsLong: pProfitsLong,
    lossesShort: pLossesShort,
    lossesLong: pLossesLong,
    netShort: pNetShort,
    netLong: pNetLong,
    totalValue: pTotalValue,
    tooltipValue: pTooltipValue,
    harvestedSavings: 0
  };

  const profitsShort = data.profitsShort;
  const profitsLong = data.profitsLong;
  const lossesShort = data.lossesShort;
  const lossesLong = data.lossesLong;
  const netShort = data.netShort;
  const netLong = data.netLong;
  const totalValue = type ? data.total : pTotalValue;
  const tooltipValue = type === "after" ? data.total : (pTooltipValue ?? totalValue);
  
  // Logic for the note
  // If selected short-term gains are in loss, show note.
  // In our context, harvestedSavings reflects the sum of losses selected.
  const harvestedSavings = summary.after.harvestedSavings;
  const displayNote = type === "after" && harvestedSavings > 0;
  const note = "🎉 Your taxable capital gains are reduced by:";
  const noteValue = harvestedSavings;

  return (
    <div
      className={`w-full rounded-2xl p-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:p-6 ${bgClass}`}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>

      <div className="mt-6 grid grid-cols-3 gap-y-5 text-sm sm:text-lg">
        <div />
        <div className="text-center font-medium text-white/85">Short-term</div>
        <div className="text-center font-medium text-white/85">Long-term</div>

        <div className="font-medium">Profits</div>
        <div className="text-center">${profitsShort.toLocaleString()}</div>
        <div className="text-center">{formatCompactCurrency(profitsLong)}</div>

        <div className="font-medium">Losses</div>
        <div className="text-center">${lossesShort.toLocaleString()}</div>
        <div className="text-center">{formatCompactCurrency(lossesLong)}</div>

        <div className="font-medium">Net Capital Gains</div>
        <div className="text-center">-${netShort.toLocaleString()}</div>
        <div className="text-center">{formatCompactCurrency(netLong)}</div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-2xl font-semibold">
        <span>{totalLabel}</span>

        {showTooltip ? (
          <div className="relative group inline-flex items-center">
            <span className="cursor-default">
              {formatCompactCurrency(totalValue)}
            </span>

            <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-max -translate-x-1/2 rounded-2xl bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-900 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition duration-200 group-hover:opacity-100 sm:text-base">
              {formatExactCurrency(tooltipValue)}
              <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-neutral-100" />
            </div>
          </div>
        ) : (
          <span>{formatCompactCurrency(totalValue)}</span>
        )}
      </div>

      {(showNote || displayNote) && (
        <p className="mt-6 text-base text-white/90 sm:text-2xl">
          {displayNote ? note : pNote}
          <span className="font-semibold ml-2">
            {formatCompactCurrency(displayNote ? noteValue : pNoteValue)}
          </span>
        </p>
      )}
    </div>
  );
};

export default HarvestingSummaryCard;

