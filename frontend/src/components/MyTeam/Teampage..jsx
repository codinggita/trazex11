import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ProfileCard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get logged-in userId
        if (!userId) {
          console.error("User not logged in.");
          return;
        }

        const response = await fetch(`http://localhost:3000/api/team/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }

        const fetchedTeams = await response.json();
        setTeams(fetchedTeams); // Store all teams in state
      } catch (error) {
        console.error("Error fetching team data:", error.message);
      }
    };

    fetchUserTeams();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex overflow-hidden flex-col items-center px-20 pt-28 bg-black pb-20 max-md:px-5 max-md:py-24 relative">
        {teams.length === 0 ? (
          <p className="text-white text-xl">No teams found. Create a new team!</p>
        ) : (
          teams.map((team, index) => (
            <div key={index} className="flex relative flex-col pb-4 w-full rounded-2xl max-w-[1150px] min-h-[280px] max-md:max-w-full mb-8">
              {/* Background Image */}
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8180c58adbc9e969ee32cf4624bbdd53cf3b5921822df80477344cd64f4b6a?apiKey=f5294c2440c849e09806e1501d656072"
                alt=""
                className="object-cover absolute inset-0 size-full"
              />

              {/* Profile Header */}
              <div className="flex relative flex-wrap gap-5 justify-between px-7 py-2 w-full rounded-2xl bg-black bg-opacity-40 max-md:pr-5 max-md:max-w-full">
                <div className="my-auto text-3xl font-bold text-[#c5c5c5]">
                  {team.teamName || `Team ${index + 1}`}
                </div>
              </div>

              {/* Stats & Company Logos */}
              <div className="flex relative flex-wrap gap-5 justify-between self-center mt-7 w-full max-w-[1031px] max-md:max-w-full">
                {/* Buy & Sell Count */}
                <div className="flex gap-10 self-start font-bold text-[#c5c5c5] whitespace-nowrap">
                  <StatBox label="BUY" value={team.stocks.filter(stock => stock.action === "BUY").length} />
                  <StatBox label="SELL" value={team.stocks.filter(stock => stock.action === "SELL").length} />
                </div>

                {/* Captain & Vice-Captain */}
                <div className="flex gap-10 text-lg font-semibold leading-5 text-center">
                  {team.captain && <CompanyLogo name={team.captain.name} logoSrc={team.captain.image} badge="C" />}
                  {team.viceCaptain && <CompanyLogo name={team.viceCaptain.name} logoSrc={team.viceCaptain.image} badge="VC" />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Team Button */}
      <div className="flex justify-center items-center mt-5">
        <Link
          to="/Createteams"
          className="px-6 py-3 text-lg font-semibold text-white bg-[#1f1f1f] rounded-lg shadow-lg hover:bg-[#80db60] transition-all"
        >
          Create Team
        </Link>
      </div>

      <Footer />
    </>
  );
};

// Stat Box Component
const StatBox = ({ label, value }) => (
  <div className="flex flex-col">
    <div className="text-5xl text-white max-md:text-4xl">{label}</div>
    <div className="self-center text-white mt-7 text-6xl max-md:text-4xl">{value}</div>
  </div>
);

// Company Logo Component
const CompanyLogo = ({ name, logoSrc, badge }) => (
  <div className="relative flex flex-col self-end mt-8">
    <div className="relative">
      <img loading="lazy" src={logoSrc} alt={`${name} logo`} className="object-contain aspect-square w-[90px]" />
      {badge && (
        <div className="absolute top-0 left-0 bg-neutral-900 text-white border-[2px] border-stone-300 rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold">
          {badge}
        </div>
      )}
    </div>
    <div className="self-start mt-4">{name}</div>
  </div>
);

export default ProfileCard;
