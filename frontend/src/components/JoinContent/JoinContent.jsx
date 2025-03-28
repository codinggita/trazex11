

// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const JoinConfirmation = ({ setIsOpen }) => {
//   const [userId, setUserId] = useState(null);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [captain, setCaptain] = useState(null);
//   const [viceCaptain, setViceCaptain] = useState(null);

//   useEffect(() => {
//     // Fetch userId from localStorage
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }

//     // Fetch selected stocks
//     const storedStocks = JSON.parse(localStorage.getItem("selectedStocks"));
//     if (storedStocks && storedStocks.length > 0) {
//       setSelectedStocks(storedStocks);
//     } else {
//       console.error("Error: No stocks found in localStorage");
//     }

//     // Fetch Captain and Vice-Captain
//     const storedCaptain = JSON.parse(localStorage.getItem("captain"));
//     const storedViceCaptain = JSON.parse(localStorage.getItem("viceCaptain"));

//     if (storedCaptain) {
//       setCaptain(storedCaptain);
//     } else {
//       console.error("Error: No Captain found in localStorage");
//     }

//     if (storedViceCaptain) {
//       setViceCaptain(storedViceCaptain);
//     } else {
//       console.error("Error: No Vice-Captain found in localStorage");
//     }

//     console.log("Retrieved User ID:", storedUserId);
//     console.log("Retrieved Selected Stocks:", storedStocks);
//     console.log("Retrieved Captain:", storedCaptain);
//     console.log("Retrieved Vice-Captain:", storedViceCaptain);

//   }, []);

//   const handleSave = async () => {
//     if (!userId || selectedStocks.length === 0 || !captain || !viceCaptain) {
//       toast.error("Missing team details! Check console for details.", {
//         position: "top-right",
//         autoClose: 20000,
//       });      
//       console.error("Missing Details -> userId:", userId, "Stocks:", selectedStocks, "Captain:", captain, "Vice-Captain:", viceCaptain);
//       return;
//     }

//     const payload = {
//       userId,
      
//       stocks: selectedStocks.map(stock => ({ name: stock.name, action: stock.type, sector: stock.sector, image: stock.image })),
//       captain: {
//         name: captain.name, 
//         action: captain.type,
//         sector: captain.sector,
//         image: captain.image 
//       },
//       viceCaptain: {
//         name: viceCaptain.name, 
//         action: viceCaptain.type,
//         sector: viceCaptain.sector,
//         image: viceCaptain.image   
//       }
//     };

//     try {
//       console.log("Payload", payload)
//       const response = await axios.post("http://localhost:3000/api/team/create-team", payload);
//       console.log("Team created successfully:", response.data);
      
//       toast.success( "Team successfully created!", {
//         position: "top-right",
//         autoClose: 20000,
//         // style: { backgroundColor: "black", color: "white" }
//       });
//     } catch (error) {
//       console.error("Error creating team:", error);
//       toast.error("Failed to create team. Please try again.", {
//         position: "top-right",
//         autoClose: 20000,
//         // style: { backgroundColor: "black", color: "white" }
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-[495px] h-[285px] bg-[#1A1A1A] rounded-lg shadow-lg p-6 relative text-white">
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-white"
//           onClick={() => setIsOpen(false)}
//         >
//           <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739689311/qfish90qpd92qfbqucdo.png" alt="Close" className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center mb-6">Join Confirmation</h2>
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-gray-300">Entry</span>
//           <span className="flex items-center gap-1 text-lg font-medium">
//             <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739692460/rxkduwzdyxozzizaanrl.png" alt="Coin" className="w-[24px] h-[24px]" /> 50
//           </span>
//         </div>
//         <div className="flex justify-between items-center mb-8">
//           <span className="text-gray-300 flex items-center gap-1">
//             To Pay <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739690238/ecxbhssscmqlfhvfw2ik.png" alt="Info" className="w-4 h-4 text-gray-400" />
//           </span>
//           <span className="flex items-center gap-1 text-lg font-medium">
//             <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739692460/rxkduwzdyxozzizaanrl.png" alt="Coin" className="w-[24px] h-[24px]" /> 50
//           </span>
//         </div>
//         <Link to="/mycontest">
//           <button 
//             onClick={handleSave}
//             className="w-full mt-9 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md"
//           >
//             Join Contest
//           </button>
//         </Link>
//       </div>
//       <ToastContainer />
//     </div>

//   );
// };

// export default JoinConfirmation;








// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const JoinContest = () => {
//   const [contestId, setContestId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [teamId, setTeamId] = useState(null);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [captain, setCaptain] = useState(null);
//   const [viceCaptain, setViceCaptain] = useState(null);

//   useEffect(() => {
//     setContestId(localStorage.getItem("contestId"));
//     setUserId(localStorage.getItem("userId"));
//     setSelectedStocks(JSON.parse(localStorage.getItem("selectedStocks")) || []);
//     setCaptain(JSON.parse(localStorage.getItem("captain")));
//     setViceCaptain(JSON.parse(localStorage.getItem("viceCaptain")));
//   }, []);

//   const handleSave = async () => {
//     if (!contestId || !userId || selectedStocks.length === 0 || !captain || !viceCaptain) {
//       toast.error("Missing details! Please check console.");
//       console.error("Missing details:", { contestId, userId, selectedStocks, captain, viceCaptain });
//       return;
//     }

//     const payload = {
//       userId,
//       contestId, // Include contestId in the payload
//       stocks: selectedStocks.map(stock => ({
//         name: stock.name,
//         action: stock.type,
//         sector: stock.sector,
//         image: stock.image,
//       })),
//       captain: {
//         name: captain.name,
//         action: captain.type,
//         sector: captain.sector,
//         image: captain.image,
//       },
//       viceCaptain: {
//         name: viceCaptain.name,
//         action: viceCaptain.type,
//         sector: viceCaptain.sector,
//         image: viceCaptain.image,
//       },
//     };

//     try {
//       console.log("Sending request to create team:", payload);
//       const response = await axios.post("https://trazex11-4.onrender.com/api/team/create-team", payload);
//       console.log("API Response:", response.data);

//       // Extract teamId properly from the response
//       const newTeamId = response.data.team?._id; // Ensure correct key (_id or id)
//       if (!newTeamId) {
//         console.error("Error: API did not return a valid teamId:", response.data);
//         toast.error("Failed to create team. Invalid response from server.");
//         return;
//       }

//       // Save teamId
//       localStorage.setItem("teamId", newTeamId);
//       setTeamId(newTeamId);

//       toast.success("Team successfully created!");

//       // Join the contest with the created teamId
//       await joinContest(newTeamId, contestId, userId);
//     } catch (error) {
//       console.error("Error creating team:", error.response ? error.response.data : error.message);
//       toast.error("Failed to create team. Try again.");
//     }
//   };

//   // Function to join the contest
//   const joinContest = async (teamId, contestId, userId) => {
//     if (!teamId) {
//       console.error("Error: Missing teamId when joining contest.");
//       toast.error("Failed to join contest. Invalid team ID.");
//       return;
//     }

//     const joinPayload = { teamId, contestId, userId };

//     try {
//       console.log("Sending request to join contest:", joinPayload);
//       const response = await axios.post("https://trazex11-4.onrender.com/api/contests/join", joinPayload);
//       console.log("Joined contest successfully:", response.data);
//       toast.success("Successfully joined the contest!");
//     } catch (error) {
//       console.error("Error joining contest:", error.response ? error.response.data : error.message);
//       toast.error("Failed to join contest. Try again.");
//     }
//   };

//   return (
//     <div>
//       {/* <button onClick={handleSave} className="text-white">Join Contest</button> */}
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-[495px] h-[285px] bg-[#1A1A1A] rounded-lg shadow-lg p-6 relative text-white">
//          <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-white"
//           onClick={() => setIsOpen(false)}
//         >
//           <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739689311/qfish90qpd92qfbqucdo.png" alt="Close" className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center mb-6">Join Confirmation</h2>
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-gray-300">Entry</span>
//           <span className="flex items-center gap-1 text-lg font-medium">
//             <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739692460/rxkduwzdyxozzizaanrl.png" alt="Coin" className="w-[24px] h-[24px]" /> 50
//           </span>
//         </div>
//         <div className="flex justify-between items-center mb-8">
//           <span className="text-gray-300 flex items-center gap-1">
//             To Pay <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739690238/ecxbhssscmqlfhvfw2ik.png" alt="Info" className="w-4 h-4 text-gray-400" />
//           </span>
//           <span className="flex items-center gap-1 text-lg font-medium">
//             <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739692460/rxkduwzdyxozzizaanrl.png" alt="Coin" className="w-[24px] h-[24px]" /> 50
//           </span>
//         </div>
//         <Link to="/mycontest">
//           <button 
//             onClick={handleSave}
//             className="w-full mt-9 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md"
//           >
//             Join Contest
//           </button>
//         </Link>
//       </div>
//       <ToastContainer />
//     </div>
//     </div>
//   );
// };

// export default JoinContest;




import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import { Link } from "react-router-dom";

const JoinContest = ({ setIsOpen }) => {
  const [contestId, setContestId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  const [entryFee, setEntryFee] = useState(0);

  // Function to format the date as "DD MMM"
  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return `${day} ${month}`;
  };

  useEffect(() => {
    const storedContestId = localStorage.getItem("contestId");
    setContestId(storedContestId);
    setUserId(localStorage.getItem("userId"));
    setSelectedStocks(JSON.parse(localStorage.getItem("selectedStocks")) || []);
    setCaptain(JSON.parse(localStorage.getItem("captain")));
    setViceCaptain(JSON.parse(localStorage.getItem("viceCaptain")));

    const fetchContestDetails = async () => {
      try {
        const date = getFormattedDate();
        const exchange = localStorage.getItem("exchange") || "NSE";
        console.log("Fetching contest for:", { date, exchange, storedContestId });

        const response = await axios.get(
          `https://trazex11-4.onrender.com/api/contests/date/${date}/exchange/${exchange}`
        );

        console.log(`Fetching contest for: Date=${date}, Exchange=${exchange}`);
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const matchingContest = response.data.find((contest) => contest._id === storedContestId);
          if (matchingContest) {
            console.log("Matching contest found:", matchingContest);
            setEntryFee(matchingContest.entryFee || 0);
          } else {
            console.warn("No contest found matching contestId:", storedContestId);
            toast.error("Selected contest not found for this date and exchange.");
            setEntryFee(0);
          }
        } else {
          console.warn("No contests found in response:", response.data);
          toast.error(`No contests found for ${exchange} on ${date}.`);
        }
      } catch (error) {
        console.error("Error fetching contest details:", error.response?.data || error.message);
        toast.error("Failed to fetch contest details.");
      }
    };

    fetchContestDetails();
  }, []);

  const handleSave = async () => {
    toast.info("Starting team creation process..."); // Debug toast
    if (!contestId || !userId || selectedStocks.length === 0 || !captain || !viceCaptain) {
      toast.error("Missing details! Please check console.");
      console.error("Missing details:", { contestId, userId, selectedStocks, captain, viceCaptain });
      return;
    }

    const payload = {
      userId,
      contestId,
      stocks: selectedStocks.map((stock) => ({
        name: stock.name,
        action: stock.type,
        sector: stock.sector,
        image: stock.image,
      })),
      captain: {
        name: captain.name,
        action: captain.type,
        sector: captain.sector,
        image: captain.image,
      },
      viceCaptain: {
        name: viceCaptain.name,
        action: viceCaptain.type,
        sector: viceCaptain.sector,
        image: viceCaptain.image,
      },
    };

    try {
      console.log("Sending request to create team:", payload);
      const response = await axios.post("https://trazex11-4.onrender.com/api/team/create-team", payload);

      const newTeamId = response.data.team?._id;
      if (!newTeamId) {
        console.error("Error: API did not return a valid teamId:", response.data);
        toast.error("Failed to create team.");
        return;
      }

      localStorage.setItem("teamId", newTeamId);
      setTeamId(newTeamId);
      toast.success("Team successfully created!");

      await joinContest(newTeamId, contestId, userId);
      setIsOpen(false); // Close modal only after success
    } catch (error) {
      console.error("Error creating team:", error.response ? error.response.data : error.message);
      toast.error("Failed to create team. Try again.");
    }
  };

  const joinContest = async (teamId, contestId, userId) => {
    if (!teamId) {
      toast.error("Invalid team ID.");
      return;
    }

    const joinPayload = { teamId, contestId, userId };

    try {
      const response = await axios.post("https://trazex11-4.onrender.com/api/contests/join", joinPayload);
      toast.success("Successfully joined the contest!");
    } catch (error) {
      console.error("Error joining contest:", error.response ? error.response.data : error.message);
      toast.error("Failed to join contest. Try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-[495px] h-[285px] bg-[#1A1A1A] rounded-lg shadow-lg p-6 relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Add ToastContainer here */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={{ zIndex: 9999 }}
        />

        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739689311/qfish90qpd92qfbqucdo.png"
            alt="Close"
            className="w-5 h-5"
          />
        </button>
        <h2 className="text-lg font-semibold text-center mb-6">Join Confirmation</h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300">Entry</span>
          <span className="flex items-center gap-1 text-lg font-medium">
            <img
              src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739692460/rxkduwzdyxozzizaanrl.png"
              alt="Coin"
              className="w-[24px] h-[24px]"
            />
            {entryFee}
          </span>
        </div>
        <div className="flex justify-between items-center mb-8">
          <span className="text-gray-300 flex items-center gap-1">
            To Pay{" "}
            <img
              src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739690238/ecxbhssscmqlfhvfw2ik.png"
              alt="Info"
              className="w-4 h-4 text-gray-400"
            />
          </span>
          <span className="flex items-center gap-1 text-lg font-medium">
            <img
              src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739692460/rxkduwzdyxozzizaanrl.png"
              alt="Coin"
              className="w-[24px] h-[24px]"
            />
            {entryFee}
          </span>
        </div>
        <Link to="/mycontest">
          <button
            onClick={handleSave}
            className="w-full mt-9 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md"
          >
            Join Contest
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinContest;