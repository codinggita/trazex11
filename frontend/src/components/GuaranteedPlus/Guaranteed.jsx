

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../Loader/Loader'

// const ContestDetails = () => {
//   const { date, exchange } = useParams();
//   const [contests, setContests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContests = async () => {
//       try {
//         const response = await axios.get(`https://trazex11-4.onrender.com/api/contests/date/${date}/exchange/${exchange}`);
//         setContests(response.data);
//       } catch (err) {
//         setError('Error fetching contests');
//         console.error('Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContests();
//   }, [date, exchange]);

//   const navigate = useNavigate();

//   const handleGoToCreateTeams = (contestId) => {
//     localStorage.setItem("contestId", contestId); // Store contest ID
//     localStorage.setItem("exchange", exchange);
//     navigate("/createTeams");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex items-center justify-center">
//         <section className="rounded-none mt-10 w-[1291px]">
//           {loading ? (
//             <p className="text-center text-white"><Loader /></p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : contests.length === 0 ? (
//             <p className="text-center text-white">No contests available.</p>
//           ) : (
//             contests.map((contest) => (
//               <article key={contest._id} className="flex flex-col pt-3.5 w-full rounded-lg bg-stone-900 max-md:max-w-full mb-5">
//                 <GuaranteedPlusHeader 
//                   icon="https://cdn.builder.io/api/v1/image/assets/TEMP/1adff2cb2f31b63bd5b8b039a8e7127ca3fd67b86738bdab4faf6ea4085527cf" 
//                   title={contest.name} 
//                   amount={`${contest.prize} Coins`} 
//                   spotsLeft={contest.spotsLeft} 
//                   totalSpots={contest.totalSpots} 
//                   entryFee={contest.entryFee} 
//                   prizepool={`${contest.prize} Coins`} 
//                   contestId={contest._id} 
//                   handleGoToCreateTeams={handleGoToCreateTeams}  // ✅ Pass function
//                 />
//                 <StatsSection 
//                   prizepool={`${contest.prize}`} 
//                   firstprize={`${contest.firstprize}`}
//                   totalteam={`${contest.maximumteam}`}
//                   winpercentage={`${contest.winpercentage}`}
//                 />
//               </article>
//             ))
//           )}
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const GuaranteedPlusHeader = ({ icon, title, amount, spotsLeft, totalSpots, entryFee, contestId, handleGoToCreateTeams }) => (
//   <div className="flex flex-wrap gap-5 justify-between self-center w-full max-w-[1241px] max-md:max-w-full">
//     <div className="flex flex-col self-start max-md:max-w-full">
//       <div className="flex gap-5 self-start text-xl font-semibold text-white">
//         <img loading="lazy" src={icon} className="object-contain shrink-0 my-auto aspect-[1.05] w-[21px]" alt="Guaranteed Plus Icon" />
//         <h1>{title}</h1>
//       </div>
//       <div className="flex flex-wrap gap-5 justify-between items-start mt-6 max-md:max-w-full">
//         <p className="mt-2.5 text-5xl font-bold leading-none text-white max-md:text-4xl">{amount}</p>
//       </div>
//     </div>
//     <ProgressBar spotsLeft={spotsLeft} totalSpots={totalSpots} />
//     <EntryFeeSection entryFee={entryFee} contestId={contestId} handleGoToCreateTeams={handleGoToCreateTeams} />  
//   </div>
// );

// const ProgressBar = ({ spotsLeft, totalSpots }) => {
//   const progress = ((totalSpots - spotsLeft) / totalSpots) * 100;

//   return (
//     <div className="w-full max-w-[350px] self-center">
//       <div className="flex justify-between text-xs text-gray-400 mb-1">
//         <span className="text-green-400">{spotsLeft.toLocaleString()}</span>
//         <span>{totalSpots.toLocaleString()}</span>
//       </div>
//       <div className="relative w-full h-3 bg-gray-700 rounded-full">
//         <div className="h-full bg-green-400 rounded-full" style={{ width: `${progress}%` }}></div>
//       </div>
//     </div>
//   );
// };

// const EntryFeeSection = ({ entryFee, contestId, handleGoToCreateTeams }) => {
//   return (
//     <div className="flex flex-col text-white">
//       <div className="flex flex-col px-8 py-2 w-full text-3xl font-bold leading-none rounded-lg bg-emerald-400 bg-opacity-10 max-md:px-5">
//         <h2>Entry Fee</h2>
//         <div className="flex gap-3.5 self-center items-center mt-1 whitespace-nowrap w-[79px]">
//           <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a173a2cfdc7598c5bce331a49044fb35aaa78a619f2d1b37ebbf2edde63c9cee" className="object-contain shrink-0 mt-1 my-auto w-8 aspect-[1.07]" alt="Entry Fee Icon" />
//           <span>{entryFee}</span>
//         </div>
//       </div>
//       <button onClick={() => handleGoToCreateTeams(contestId)} className="self-center mt-4 text-[21px] text-white bg-[#3FD68C] px-4 py-2 h-[47px] w-[157px] font-semibold rounded-md flex items-center justify-center">
//         Join Now <span className="ml-2">➜</span>
//       </button>
//     </div>
//   );
// };

// const StatsSection = ({ prizepool, firstprize, winpercentage, totalteam }) => {
//   const [isToggled, setIsToggled] = useState(false);

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//   };

//   return (
//     <div className="flex flex-col overflow-hidden gap-5 px-7 py-1.5 mt-4 w-full font-medium rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
//       {/* Clickable Header (Stats Section) */}
//       <div
//         className="flex overflow-hidden flex-wrap gap-5 items-center justify-between w-full cursor-pointer"
//         onClick={handleToggle}
//       >
//         <div className="flex flex-wrap gap-10 text-2xl max-md:max-w-full">
//           <div className="flex flex-auto gap-5 items-center self-start text-stone-300">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8ead62c132ac2c7e2d772a0bbf895d37c7840641f982fac36ecf0a2d4cac257"
//               className="object-contain shrink-0 self-stretch my-auto aspect-square w-[35px]"
//               alt="Stats Icon"
//             />
//             <span className="self-stretch leading-relaxed">{firstprize}</span>
//             <div className="shrink-0 self-stretch my-auto w-px h-9 border border-white border-solid" />
//             <span className="flex items-center justify-center w-8 h-8 text-lg font-semibold text-white border-2 border-stone-300 rounded-lg">
//               M
//             </span>
//             <span className="self-stretch my-auto leading-tight">Upto {totalteam}</span>
//             <div className="shrink-0 self-stretch my-auto w-px h-9 border border-white border-solid" />
//           </div>
//           <div className="flex gap-4 items-center justify-center -ml-4">
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/3112/3112946.png"
//               alt="Trophy"
//               className="object-contain shrink-0 my-auto w-8"
//             />
//             <span className="text-white">{winpercentage}%</span>
//           </div>
//         </div>
//         <div className="flex gap-7 self-start text-2xl leading-loose text-white">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/33d91e4d51c1d362e15a4dfa163f2ee77bde5b2a6d37d4eccdfc4997fb00ea46"
//             className="object-contain shrink-0 my-auto w-8 aspect-[1.68]"
//             alt="Total Amount Icon"
//           />
//           <span>{prizepool}</span>
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/41ccfc38390615e5dcc4424b858b95819238dc694198d88f05c1c2f6787e3172"
//             alt="coin"
//             className="object-contain shrink-0 my-auto w-8"
//           />
//         </div>
//       </div>

//       {/* Dropdown Content */}
//       {isToggled && (
//         <div className="flex flex-col md:flex-row gap-5 mt-4 w-full">
//           <div className="w-full md:w-1/2">
//             <PrizeBreakup />
//           </div>
//           <div className="w-full md:w-1/2">
//             <Leaderboard />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



// export default ContestDetails;



// const PrizeBreakup = () => {
//   const prizeData = [
//     { rank: 1, prize: "1.50 Crores" },
//     { rank: 2, prize: "1.50 Crores" },
//     { rank: 3, prize: "1.50 Crores" },
//     { rank: 4, prize: "1.50 Crores" },
//     { rank: 5, prize: "1.50 Crores" },
//     { rank: 6, prize: "1.50 Crores" },
//   ];

//   return (
//     <div className="w-full">
//       <h3 className="text-xl font-semibold text-white mb-2">Winnings</h3>
//       <div className="flex flex-col gap-2">
//         {prizeData.map((item, index) => (
//           <div key={index} className="flex justify-between items-center text-white">
//             <div className="flex items-center gap-2">
//               <span className="text-lg">{item.rank === 1 ? "🏆" : `#${item.rank}`}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <img
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/41ccfc38390615e5dcc4424b858b95819238dc694198d88f05c1c2f6787e3172"
//                 alt="coin"
//                 className="object-contain w-6"
//               />
//               <span className="text-lg">{item.prize}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Leaderboard Component (unchanged)
// const Leaderboard = () => {
//   const leaderboardData = [
//     { rank: 1, username: "MAYANK_DUDHATRA_06", teamNo: "T1", points: "1455" },
//     { rank: 2, username: "MAYANK_DUDHATRA_06", teamNo: "T1", points: "1265" },
//     { rank: 3, username: "MAYANK_DUDHATRA_06", teamNo: "T1", points: "1145" },
//     { rank: 4, username: "MAYANK_DUDHATRA_06", teamNo: "T1", points: "952" },
//     { rank: 5, username: "MAYANK_DUDHATRA_06", teamNo: "T1", points: "874" },
//   ];

//   return (
//     <div className="w-full mt-4">
//       <h3 className="text-xl font-semibold text-white mb-2">Leaderboards</h3>
//       <div className="flex flex-col gap-2">
//         {leaderboardData.map((item, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center text-white border-b border-gray-700 py-1"
//           >
//             <div className="flex items-center gap-2 w-1/4">
//               <span className="text-lg">{item.rank === 1 ? "🏆" : `#${item.rank}`}</span>
//             </div>
//             <div className="flex items-center gap-2 w-1/4">
//               <img
//                 src="https://res-console.cloudinary.com/dbrb9ptmn/media_explorer_thumbnails/3d227726335182d7a63379073301db14/detailed"
//                 alt="user"
//                 className="object-contain w-6"
//               />
//               <span className="text-lg truncate">{item.username}</span>
//             </div>
//             <div className="w-1/4 text-lg">{item.teamNo}</div>
//             <div className="w-1/4 text-lg">{item.points}</div>
//             <button>Show</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

const ContestDetails = () => {
  const { date, exchange } = useParams();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(`https://trazex11-4.onrender.com/api/contests/date/${date}/exchange/${exchange}`);
        setContests(response.data);
      } catch (err) {
        setError('Error fetching contests');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [date, exchange]);

  const navigate = useNavigate();

  const handleGoToCreateTeams = (contestId) => {
    localStorage.setItem("contestId", contestId);
    localStorage.setItem("exchange", exchange);
    navigate("/createTeams");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <section className="rounded-none mt-10 w-[1291px]">
          {loading ? (
            <p className="text-center text-white"><Loader /></p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : contests.length === 0 ? (
            <p className="text-center text-white">No contests available.</p>
          ) : (
            contests.map((contest) => (
              <article key={contest._id} className="flex flex-col pt-3.5 w-full rounded-lg bg-stone-900 max-md:max-w-full mb-5">
                <GuaranteedPlusHeader 
                  icon="https://cdn.builder.io/api/v1/image/assets/TEMP/1adff2cb2f31b63bd5b8b039a8e7127ca3fd67b86738bdab4faf6ea4085527cf" 
                  title={contest.name} 
                  amount={`${contest.prize} Coins`} 
                  spotsLeft={contest.spotsLeft} 
                  totalSpots={contest.totalSpots} 
                  entryFee={contest.entryFee} 
                  prizepool={`${contest.prize} Coins`} 
                  contestId={contest._id} 
                  handleGoToCreateTeams={handleGoToCreateTeams}
                />
                <StatsSection 
                  prizepool={`${contest.prize}`} 
                  firstprize={`${contest.firstprize}`}
                  totalteam={`${contest.maximumteam}`}
                  winpercentage={`${contest.winpercentage}`}
                  joinedTeams={contest.joinedTeams}
                />
              </article>
            ))
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

const GuaranteedPlusHeader = ({ icon, title, amount, spotsLeft, totalSpots, entryFee, contestId, handleGoToCreateTeams }) => (
  <div className="flex flex-wrap gap-5 justify-between self-center w-full max-w-[1241px] max-md:max-w-full">
    <div className="flex flex-col self-start max-md:max-w-full">
      <div className="flex gap-5 self-start text-xl font-semibold text-white">
        <img loading="lazy" src={icon} className="object-contain shrink-0 my-auto aspect-[1.05] w-[21px]" alt="Guaranteed Plus Icon" />
        <h1>{title}</h1>
      </div>
      <div className="flex flex-wrap gap-5 justify-between items-start mt-6 max-md:max-w-full">
        <p className="mt-2.5 text-5xl font-bold leading-none text-white max-md:text-4xl">{amount}</p>
      </div>
    </div>
    <ProgressBar spotsLeft={spotsLeft} totalSpots={totalSpots} />
    <EntryFeeSection entryFee={entryFee} contestId={contestId} handleGoToCreateTeams={handleGoToCreateTeams} />  
  </div>
);

const ProgressBar = ({ spotsLeft, totalSpots }) => {
  const progress = ((totalSpots - spotsLeft) / totalSpots) * 100;

  return (
    <div className="w-full max-w-[350px] self-center">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span className="text-green-400">{spotsLeft.toLocaleString()}</span>
        <span>{totalSpots.toLocaleString()}</span>
      </div>
      <div className="relative w-full h-3 bg-gray-700 rounded-full">
        <div className="h-full bg-green-400 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

const EntryFeeSection = ({ entryFee, contestId, handleGoToCreateTeams }) => {
  return (
    <div className="flex flex-col text-white">
      <div className="flex flex-col px-8 py-2 w-full text-3xl font-bold leading-none rounded-lg bg-emerald-400 bg-opacity-10 max-md:px-5">
        <h2>Entry Fee</h2>
        <div className="flex gap-3.5 self-center items-center mt-1 whitespace-nowrap w-[79px]">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a173a2cfdc7598c5bce331a49044fb35aaa78a619f2d1b37ebbf2edde63c9cee" className="object-contain shrink-0 mt-1 my-auto w-8 aspect-[1.07]" alt="Entry Fee Icon" />
          <span>{entryFee}</span>
        </div>
      </div>
      <button onClick={() => handleGoToCreateTeams(contestId)} className="self-center mt-4 text-[21px] text-white bg-[#3FD68C] px-4 py-2 h-[47px] w-[157px] font-semibold rounded-md flex items-center justify-center">
        Join Now <span className="ml-2">➜</span>
      </button>
    </div>
  );
};

const StatsSection = ({ prizepool, firstprize, winpercentage, totalteam, joinedTeams }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex flex-col overflow-hidden gap-5 px-7 py-1.5 mt-4 w-full font-medium rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
      <div
        className="flex overflow-hidden flex-wrap gap-5 items-center justify-between w-full cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex flex-wrap gap-10 text-2xl max-md:max-w-full">
          <div className="flex flex-auto gap-5 items-center self-start text-stone-300">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8ead62c132ac2c7e2d772a0bbf895d37c7840641f982fac36ecf0a2d4cac257"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[35px]"
              alt="Stats Icon"
            />
            <span className="self-stretch leading-relaxed">{firstprize}</span>
            <div className="shrink-0 self-stretch my-auto w-px h-9 border border-white border-solid" />
            <span className="flex items-center justify-center w-8 h-8 text-lg font-semibold text-white border-2 border-stone-300 rounded-lg">
              M
            </span>
            <span className="self-stretch my-auto leading-tight">Upto {totalteam}</span>
            <div className="shrink-0 self-stretch my-auto w-px h-9 border border-white border-solid" />
          </div>
          <div className="flex gap-4 items-center justify-center -ml-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3112/3112946.png"
              alt="Trophy"
              className="object-contain shrink-0 my-auto w-8"
            />
            <span className="text-white">{winpercentage}%</span>
          </div>
        </div>
        <div className="flex gap-7 self-start text-2xl leading-loose text-white">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/33d91e4d51c1d362e15a4dfa163f2ee77bde5b2a6d37d4eccdfc4997fb00ea46"
            className="object-contain shrink-0 my-auto w-8 aspect-[1.68]"
            alt="Total Amount Icon"
          />
          <span>{prizepool}</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/41ccfc38390615e5dcc4424b858b95819238dc694198d88f05c1c2f6787e3172"
            alt="coin"
            className="object-contain shrink-0 my-auto w-8"
          />
        </div>
      </div>

      {isToggled && (
        <div className="flex flex-col md:flex-row gap-5 mt-4 w-full">
          <div className="w-full md:w-1/2">
            <PrizeBreakup />
          </div>
          <div className="w-full md:w-1/2">
            <Leaderboard joinedTeams={joinedTeams} />
          </div>
        </div>
      )}
    </div>
  );
};

const PrizeBreakup = () => {
  const prizeData = [
    { rank: 1, prize: "1.50 Crores" },
    { rank: 2, prize: "1.50 Crores" },
    { rank: 3, prize: "1.50 Crores" },
    { rank: 4, prize: "1.50 Crores" },
    { rank: 5, prize: "1.50 Crores" },
    { rank: 6, prize: "1.50 Crores" },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-white mb-2">Winnings</h3>
      <div className="flex flex-col gap-2">
        {prizeData.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-lg">{item.rank === 1 ? "🏆" : `#${item.rank}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/41ccfc38390615e5dcc4424b858b95819238dc694198d88f05c1c2f6787e3172"
                alt="coin"
                className="object-contain w-6"
              />
              <span className="text-lg">{item.prize}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = ({ joinedTeams }) => {
  const [teamDetails, setTeamDetails] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [userData, setUserData] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  // Fetch user details when joinedTeams changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!joinedTeams || joinedTeams.length === 0) return;

      const userPromises = joinedTeams.map(async (team) => {
        if (!userData[team.userId]) {
          const response = await axios.get(`https://trazex11-4.onrender.com/users/${team.userId}`);
          return { userId: team.userId, username: response.data.username || "Unknown" };
        }
        return null;
      });

      try {
        const userResults = await Promise.all(userPromises);
        const newUserData = { ...userData };

        userResults.forEach((result) => {
          if (result) newUserData[result.userId] = result.username;
        });

        setUserData(newUserData);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    fetchUserDetails();
  }, [joinedTeams]);

  // Fetch team details when "Show" is clicked
  const fetchTeamDetails = async (teamId) => {
    setLoadingTeam(true);
    try {
      const response = await axios.get(`https://trazex11-4.onrender.com/api/team/${teamId}`);
      setTeamDetails(response.data);
      setShowOverlay(true);
    } catch (err) {
      console.error('Error fetching team details:', err);
      setTeamDetails(null);
    } finally {
      setLoadingTeam(false);
    }
  };

  // Close overlay
  const closeOverlay = () => {
    setShowOverlay(false);
    setTeamDetails(null);
  };

  if (!joinedTeams || joinedTeams.length === 0) {
    return (
      <div className="w-full mt-4">
        <h3 className="text-xl font-semibold text-white mb-2">Leaderboards</h3>
        <p className="text-white">No teams have joined yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <h3 className="text-xl font-semibold text-white mb-2">Leaderboards</h3>
      <div className="flex flex-col gap-2">
        {joinedTeams.map((team, index) => (
          <div
            key={team._id}
            className="flex justify-between items-center text-white border-b border-gray-700 py-1"
          >
            <div className="flex items-center gap-2 w-1/3">
              <span className="text-lg">{index + 1 === 1 ? "🏆" : `#${index + 1}`}</span>
            </div>
            <div className="flex items-center gap-2 w-1/3">
              <img
                src="https://res-console.cloudinary.com/dbrb9ptmn/media_explorer_thumbnails/3d227726335182d7a63379073301db14/detailed"
                alt="user"
                className="object-contain w-6"
              />
              <span className="text-lg truncate">{userData[team.userId] || "Loading..."}</span>
            </div>
            <div className="w-1/3 text-lg">N/A</div>
            <button
              onClick={() => fetchTeamDetails(team.teamId)}
              className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full transition duration-200"
              disabled={loadingTeam}
            >
              {loadingTeam ? "Loading..." : "Show"}
            </button>
          </div>
        ))}
      </div>

      {/* Overlay for Team Details */}
      {showOverlay && teamDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
          <div
            className="relative bg-cover bg-center p-6 rounded-xl w-11/12 max-w-3xl text-white shadow-2xl"
            style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/7d8180c58adbc9e969ee32cf4624bbdd53cf3b5921822df80477344cd64f4b6a?apiKey=f5294c2440c849e09806e1501d656072')`,
            }}
          >
            <button
              onClick={closeOverlay}
              className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full transition duration-200"
            >
              ✕
            </button>
            <h4 className="text-2xl font-bold mb-4 text-center text-yellow-300 drop-shadow-md">Team Overview</h4>
            <div className="max-h-[70vh] overflow-y-auto space-y-6">
              {/* Team Info */}
              <div className="bg-gray-900 bg-opacity-80 p-4 rounded-lg">
                <p className="text-sm"><strong>ID:</strong> {teamDetails._id || "N/A"}</p>
                <p className="text-sm"><strong>Name:</strong> {teamDetails.name || "Unnamed Team"}</p>
                <p className="text-sm"><strong>Points:</strong> {teamDetails.points || "N/A"}</p>
              </div>

              {/* Key Players */}
              <div>
                <h5 className="text-lg font-semibold text-green-400 mb-2">Key Players</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-yellow-900 bg-opacity-70 p-3 rounded-lg">
                    <span className="text-yellow-400 font-bold text-lg">[C]</span>
                    <img src={teamDetails.captain?.image} alt={teamDetails.captain?.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-semibold">{teamDetails.captain?.name || "No Captain"}</p>
                      <p className="text-xs text-gray-300">{teamDetails.captain?.action || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-blue-900 bg-opacity-70 p-3 rounded-lg">
                    <span className="text-blue-400 font-bold text-lg">[VC]</span>
                    <img src={teamDetails.viceCaptain?.image} alt={teamDetails.viceCaptain?.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-semibold">{teamDetails.viceCaptain?.name || "No Vice-Captain"}</p>
                      <p className="text-xs text-gray-300">{teamDetails.viceCaptain?.action || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BUY and SELL in Row */}
              <div className="flex flex-row gap-6 max-md:flex-col">
                {/* BUY Section */}
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-green-400 mb-2">BUY</h5>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {teamDetails.stocks && teamDetails.stocks.length > 0 ? (
                      teamDetails.stocks
                        .filter(stock => stock.action === "BUY")
                        .map((stock, index) => (
                          <div
                            key={stock._id || index}
                            className="flex items-center gap-3 bg-gray-800 bg-opacity-70 p-3 rounded-lg hover:bg-opacity-90 transition duration-200"
                          >
                            <img src={stock.image} alt={stock.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="font-medium">{stock.name}</p>
                              <p className="text-xs text-gray-400">{stock.sector}</p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-400">No BUY stocks available</p>
                    )}
                  </div>
                </div>

                {/* SELL Section */}
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-red-400 mb-2">SELL</h5>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {teamDetails.stocks && teamDetails.stocks.length > 0 ? (
                      teamDetails.stocks
                        .filter(stock => stock.action === "SELL")
                        .map((stock, index) => (
                          <div
                            key={stock._id || index}
                            className="flex items-center gap-3 bg-gray-800 bg-opacity-70 p-3 rounded-lg hover:bg-opacity-90 transition duration-200"
                          >
                            <img src={stock.image} alt={stock.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="font-medium">{stock.name}</p>
                              <p className="text-xs text-gray-400">{stock.sector}</p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-400">No SELL stocks available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContestDetails;