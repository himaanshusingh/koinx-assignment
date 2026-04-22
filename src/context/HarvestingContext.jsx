import React, { createContext, useContext, useState, useMemo } from "react";

const HarvestingContext = createContext();

export const HarvestingProvider = ({ children }) => {
  // Static initial data (could be fetched, but using App.jsx values as base)
  const initialState = {
    profitsShort: 4049.48,
    profitsLong: 0,
    lossesShort: 32127.03,
    lossesLong: 0,
  };

  const [selectedHoldings, setSelectedHoldings] = useState([]);

  const toggleHolding = (holding) => {
    setSelectedHoldings((prev) => {
      const isSelected = prev.find((h) => h.coinName === holding.coinName && h.coin === holding.coin);
      if (isSelected) {
        return prev.filter((h) => !(h.coinName === holding.coinName && h.coin === holding.coin));
      } else {
        return [...prev, holding];
      }
    });
  };

  const summary = useMemo(() => {
    // Calculate additional profits and losses from selected holdings
    const selectedSTCGProfit = selectedHoldings.reduce((acc, curr) => {
      return curr.stcg.gain > 0 ? acc + curr.stcg.gain : acc;
    }, 0);

    const selectedSTCGLoss = selectedHoldings.reduce((acc, curr) => {
      return curr.stcg.gain < 0 ? acc + Math.abs(curr.stcg.gain) : acc;
    }, 0);

    const selectedLTCGProfit = selectedHoldings.reduce((acc, curr) => {
      return curr.ltcg.gain > 0 ? acc + curr.ltcg.gain : acc;
    }, 0);

    const selectedLTCGLoss = selectedHoldings.reduce((acc, curr) => {
      return curr.ltcg.gain < 0 ? acc + Math.abs(curr.ltcg.gain) : acc;
    }, 0);

    // Calculate dynamic values for "After Harvesting"
    const afterProfitsShort = initialState.profitsShort + selectedSTCGProfit;
    const afterLossesShort = initialState.lossesShort + selectedSTCGLoss;

    const afterProfitsLong = initialState.profitsLong + selectedLTCGProfit;
    const afterLossesLong = initialState.lossesLong + selectedLTCGLoss;

    // Realised Capital Gains (Profits - Losses)
    // Positive = Gain, Negative = Loss
    const netShort = afterProfitsShort - afterLossesShort;
    const netLong = afterProfitsLong - afterLossesLong;

    return {
      pre: {
        ...initialState,
        netShort: initialState.profitsShort - initialState.lossesShort,
        netLong: initialState.profitsLong - initialState.lossesLong,
        total: (initialState.profitsShort - initialState.lossesShort) + (initialState.profitsLong - initialState.lossesLong)
      },
      after: {
        profitsShort: afterProfitsShort,
        profitsLong: afterProfitsLong,
        lossesShort: afterLossesShort,
        lossesLong: afterLossesLong,
        netShort: netShort,
        netLong: netLong,
        total: netShort + netLong,
        harvestedSavings: selectedSTCGLoss + selectedLTCGLoss
      }
    };

  }, [selectedHoldings]);


  return (
    <HarvestingContext.Provider
      value={{
        selectedHoldings,
        toggleHolding,
        summary,
      }}
    >
      {children}
    </HarvestingContext.Provider>
  );
};

export const useHarvesting = () => {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error("useHarvesting must be used within a HarvestingProvider");
  }
  return context;
};
