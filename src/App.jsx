import Heading from "./components/Heading";
import Accordian from "./components/Accordian";
import HarvestingCard from "./components/HarvestingCard";
import Holdings from "./components/Holdings";
import { HarvestingProvider } from "./context/HarvestingContext";

const App = () => {
  return (
    <HarvestingProvider>
      <div className="w-full bg-[#0a0a11] px-4 py-5 sm:px-6 md:px-8">
        <Heading />
        <Accordian />
        <div className="flex flex-col gap-5 sm:flex-row mb-5">
          <HarvestingCard
            type="pre"
            title="Pre Harvesting"
            bgClass="bg-[#131325]"
            totalLabel="Realised Capital Gains:"
            showTooltip={false}
            showNote={false}
          />

          <HarvestingCard
            type="after"
            title="After Harvesting"
            bgClass="bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700"
            totalLabel="Effective Capital Gains:"
            showTooltip={true}
            showNote={false}
          />
        </div>
        <Holdings />
      </div>
    </HarvestingProvider>
  );
};

export default App;
