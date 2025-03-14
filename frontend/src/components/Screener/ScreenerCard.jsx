import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Details from "./CardDetails";

const StockCard = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const mockData = {
    companyName: "Reliance Industries Ltd",
    currentPrice: {
      value: 1278.2,
      change: -7.0,
      changePercentage: -0.54,
    },
    ltp: 2326.1,
    sellPoints: -97.0,
    buyPoints: 640.0,
    symbol: "RELIANCE",
    previousOpen: 1219.0,
    previousClose: 1216.1,
    open: 1219.0,
    close: 1216.1,
    high: 1224.0,
    low: 1205.45,
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-5 bg-black min-h-screen">
        <div className="w-[1130px] bg-[#1E1E1E] p-4 pt-2 rounded-xl shadow-lg mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f2c38979b8672b351b630b69096c96825165d16880067d82e084f5d23238b07"
                className="w-[50px] h-[50px] mr-3"
                alt="Company Logo"
              />
              <div>
                <p className="text-white text-[28px] font-bold">{mockData.companyName}</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <p>IND : {mockData.symbol}</p>
                  <p className="text-green-400 font-semibold bg-green-900 px-2 py-0.5 rounded text-xs">
                    LTP {mockData.ltp.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-white text-[35px] font-bold">{mockData.currentPrice.value.toFixed(2)}</p>
              <p
                className={`text-sm flex items-center ${
                  mockData.currentPrice.change < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {mockData.currentPrice.change.toFixed(2)} ({mockData.currentPrice.changePercentage.toFixed(2)}%)
                <img
                  src={mockData.currentPrice.change < 0 ? "/path/to/down-arrow.png" : "/path/to/up-arrow.png"}
                  className="ml-1 w-4 h-4"
                  alt={mockData.currentPrice.change < 0 ? "Down" : "Up"}
                />
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-4 text-white text-[20px]">
            <p className="text-green-400 font-semibold">
              <span className="text-white">BUY Points: </span>
              {mockData.buyPoints.toFixed(1)}
            </p>
            <p className="text-red-500 font-semibold">
              <span className="text-white">SELL Points:</span> {mockData.sellPoints.toFixed(1)}
            </p>
          </div>

          <div className="flex justify-between items-center mt-3 text-gray-400 text-[18px] border-t border-gray-700 pt-3">
            <p>P.Open: {mockData.previousOpen.toFixed(2)}</p>
            <p>P.Close: {mockData.previousClose.toFixed(2)}</p>
            <p>Open: {mockData.open.toFixed(2)}</p>
            <p>Close: {mockData.close.toFixed(2)}</p>
            <p>High: {mockData.high.toFixed(2)}</p>
            <p>Low: {mockData.low.toFixed(2)}</p>
          </div>

          {/* Clickable "See More" text */}
          <div 
            onClick={toggleDetails}
            className="flex items-center justify-center mt-4 text-white cursor-pointer hover:underline"
          >
            {showDetails ? "Hide Details" : "See More"}
          </div>

          {/* Show Details Component Conditionally */}
          {showDetails && <Details />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StockCard;
