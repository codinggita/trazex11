"use client";
import * as React from "react";
import Navbar from "../Navbar/Navbar";

const StatisticsPanel = () => {
  const ValueDisplay = ({ value, type }) => {
    const getStyles = () => {
      switch (type) {
        case "positive":
          return "text-emerald-400 bg-emerald-400 bg-opacity-30 px-6 py-3 flex items-center justify-center min-w-[120px] h-full";
        case "negative":
          return "text-red-500 bg-red-500 bg-opacity-20 px-6 py-3 flex items-center justify-center min-w-[120px] h-full";
        default:
          return "text-stone-300 px-6 py-3 flex items-center justify-center min-w-[120px] h-full";
      }
    };

    return <div className={getStyles()}>{value}</div>;
  };

  const StatisticsRow = ({ label, buyPoints, sellPoints, actual, alternating = false }) => {
    return (
      <div className={`flex w-full ${alternating ? "bg-zinc-800" : ""} items-center`}> 
        <div className="text-white font-semibold w-1/3 flex items-center px-6 py-3">{label}</div>
        <div className="flex w-2/3 justify-evenly items-center pl-48">
          <ValueDisplay value={buyPoints} type={Number(buyPoints) >= 0 ? "positive" : "negative"} />
          <ValueDisplay value={sellPoints} type={Number(sellPoints) >= 0 ? "positive" : "negative"} />
          <ValueDisplay value={actual} type="neutral" />
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="text-lg text-white min-h-screen flex flex-col items-center py-5">
        <div className="w-[1150px] p-6 rounded-xl">
          <header className="flex w-full font-bold text-lg pb-3">
            <h1 className="w-1/3 px-6">Events</h1>
            <div className="flex w-2/3 justify-evenly pl-48">
              <h2 className="text-center w-[120px]">Buy Points</h2>
              <h2 className="text-center w-[120px]">Sell Points</h2>
              <h2 className="text-center w-[120px]">Actual</h2>
            </div>
          </header>

          {[ 
            { label: "Net % Change", buyPoints: "300", sellPoints: "-97.0", actual: "18.92%", alternating: true },
            { label: "Circuits Bonus", buyPoints: "35", sellPoints: "0", actual: "15%" },
            { label: "Open/High % Change", buyPoints: "300", sellPoints: "-60.0", actual: "16.77%", alternating: true },
            { label: "Open/Low % Change", buyPoints: "-5.0", sellPoints: "25", actual: "-1.32%" },
            { label: "7/30/180/365 Day High", buyPoints: "10.0", sellPoints: "-2.0", actual: "30 Days", alternating: true },
            { label: "7/30/180/365 Day Low", buyPoints: "0", sellPoints: "0", actual: "NO" },
            { label: "LTP = High", buyPoints: "0", sellPoints: "0", actual: "NO", alternating: true },
            { label: "LTP = Low", buyPoints: "0", sellPoints: "0", actual: "NO" },
            { label: "Open High", buyPoints: "0", sellPoints: "0", actual: "NO", alternating: true },
            { label: "Open Low", buyPoints: "0", sellPoints: "0", actual: "NO" }
          ].map((item, index) => (
            <StatisticsRow key={index} {...item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default StatisticsPanel;