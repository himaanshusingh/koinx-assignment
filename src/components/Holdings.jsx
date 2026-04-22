import React, { useEffect, useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import holdingsData from "../data/holdingsData.json";
import { useHarvesting } from "../context/HarvestingContext";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const formatNumber = (value) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
  }).format(value);

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("none"); // "none", "desc", "asc"
  const { selectedHoldings, toggleHolding } = useHarvesting();

  useEffect(() => {
    const loadData = async () => {
      // const res = await fetch("../data/holdings-data.json");
      // const data = await res.json();
      // setHoldings(data);
      setHoldings(holdingsData);
    };
    loadData();
  }, []);

  const handleSort = () => {
    setSortOrder((prev) => {
      if (prev === "none") return "desc";
      if (prev === "desc") return "asc";
      return "none";
    });
  };

  const sortedHoldings = useMemo(() => {
    if (sortOrder === "none") return holdings;

    return [...holdings].sort((a, b) => {
      const valA = a.stcg.gain;
      const valB = b.stcg.gain;
      return sortOrder === "desc" ? valB - valA : valA - valB;
    });
  }, [holdings, sortOrder]);

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  const isSelected = (item) => {
    return selectedHoldings.some(
      (h) => h.coinName === item.coinName && h.coin === item.coin
    );
  };

  return (
    <div className="w-full rounded-2xl bg-[#11111a] p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold sm:text-2xl">Holdings</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]">
        <div className="hidden grid-cols-[0.7fr_2fr_1.4fr_1.2fr_1fr_1fr] gap-4 border-b border-white/10 px-4 py-4 text-sm font-medium text-white/70 lg:grid">
          <div></div>
          <div>Asset</div>
          <div className="text-center">Holdings</div>
          <div className="text-center">Current Price</div>
          <div
            onClick={handleSort}
            className="text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1 select-none"
          >
            Short-Term
            {sortOrder === "desc" && <ChevronDown size={14} className="text-blue-400" />}
            {sortOrder === "asc" && <ChevronUp size={14} className="text-blue-400" />}
          </div>
          <div className="text-center">Long-Term</div>
        </div>

        <div className="divide-y divide-white/10">
          {visibleHoldings.map((item) => (
            <div
              key={`${item.coin}-${item.coinName}`}
              className="grid gap-3 px-4 py-4 lg:grid-cols-[0.7fr_2fr_1.4fr_1.2fr_1fr_1fr] lg:items-center"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelected(item)}
                  onChange={() => toggleHolding(item)}
                  className="cursor-pointer h-5 w-5 rounded border-white/30 bg-transparent accent-blue-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={item.logo}
                  alt={item.coinName}
                  className="h-10 w-10 rounded-full bg-white/5 object-cover"
                />
                <div>
                  <div className="text-base font-semibold text-white">
                    {item.coinName}
                  </div>
                  <div className="text-sm text-white/60">{item.coin}</div>
                </div>
              </div>

              <div className="text-left lg:text-center">
                <div className="text-base font-medium">
                  {formatNumber(item.totalHolding)} {item.coin}
                </div>
                <div className="text-sm text-white/50">
                  {formatCurrency(item.averageBuyPrice)}
                </div>
              </div>

              <div className="text-left lg:text-center">
                <div className="text-base font-medium">
                  {formatCurrency(item.currentPrice)}
                </div>
              </div>

              <div className="text-left lg:text-center">
                <div
                  className={`text-base font-semibold ${
                    item.stcg.gain < 0 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {formatCurrency(item.stcg.gain)}
                </div>
                <div className="text-sm text-white/50">
                  {formatNumber(item.stcg.balance)} {item.coin}
                </div>
              </div>

              <div className="text-left lg:text-center">
                <div
                  className={`text-base font-semibold ${
                    item.ltcg.gain < 0 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {formatCurrency(item.ltcg.gain)}
                </div>
                <div className="text-sm text-white/50">
                  {formatNumber(item.ltcg.balance)} {item.coin}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {holdings.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
        >
          {showAll ? "Show less" : "View more"}
        </button>
      )}
    </div>
  );
};

export default Holdings;


