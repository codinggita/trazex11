// "use client";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// // Loader Component
// const Loader = () => (
//   <div className="flex justify-center items-center h-32">
//     <div className="border-4 border-t-4 border-green-400 rounded-full w-12 h-12 animate-spin"></div>
//   </div>
// );

// // Event Card Component
// const EventCard = () => {
//   const [contests, setContests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/api/all")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Data:", data); // Debugging log
//         if (data?.status === "success" && Array.isArray(data.contests)) {
//           setContests(data.contests);
//         } else {
//           setContests([]);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch contests.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <Loader />;
//   if (error) return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;
//   if (!contests.length)
//     return <p className="text-white text-xl text-center mt-10">No active contests available.</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center mt-16 min-h-screen">
//         {contests.map((contest) => (
//           <div
//             key={contest._id}
//             className="flex flex-col items-center pt-3 w-[1291px] h-[215px] justify-center rounded-lg bg-stone-900 max-md:max-w-full mb-4"
//           >
//             {/* Header */}
//             <header className="flex gap-5 self-start ml-3 text-xl font-semibold whitespace-nowrap text-stone-300">
//               <img
//                 loading="lazy"
//                 src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738904644/nbbzv6vdg9mitp2mque8.png"
//                 className="object-contain shrink-0 w-7 aspect-square"
//                 alt="NSE Logo"
//               />
//               <h1 className="my-auto">{contest.exchange || "NSE"}</h1>
//             </header>

//             <hr className="mt-1.5 w-full border border-white border-solid" />

//             {/* Main Content */}
//             <div className="flex flex-wrap gap-5 justify-between self-center items-center mt-6 w-full font-bold max-w-[1227px]">
//               <div className="flex gap-10 self-start mt-1.5">
//                 {/* Corrected Date Formatting */}
//                 <time className="text-5xl leading-none text-white">
//                   {contest.date || "N/A"}
//                 </time>
//                 <span className="text-2xl leading-loose text-neutral-400">
//                   {contest.day || "N/A"}
//                 </span>
//               </div>

//               <div className="flex flex-wrap gap-[350px] text-2xl items-center justify-center leading-loose">
//                 {/* Directly Displaying Backend End Time */}
//                 <span className="text-stone-300">
//                   Ends At: {contest.endTime || "N/A"}
//                 </span>

//                 <Link to="/contentsdeatils">
//                   <button className="px-5 py-1 text-white bg-emerald-400 rounded-lg">GO &gt;&gt;</button>
//                 </Link>
//               </div>
//             </div>

//             {/* Footer */}
//             <footer className="flex overflow-hidden flex-wrap gap-5 justify-between py-1.5 pr-7 pl-5 mt-8 w-[1291px] h-[52px] rounded-lg bg-neutral-800">
//               <div className="flex items-center gap-2">
//                 <span className="text-yellow-500 text-2xl">🏆</span>
//                 <p className="text-xl font-medium leading-10 text-stone-300">
//                   {contest.joinedCount || 0} Joined
//                 </p>
//               </div>
//               <p className="text-white text-xl">Status: {contest.status || "N/A"}</p>
//             </footer>
//           </div>
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default EventCard;
  













// "use client";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// const Loader = () => (
//   <div className="flex justify-center items-center h-32">
//     <div className="border-4 border-t-4 border-green-400 rounded-full w-12 h-12 animate-spin"></div>
//   </div>
// );

// const EventCard = () => {
//   const [categorizedContests, setCategorizedContests] = useState({
//     complete: [],
//     upcoming: [],
//     live: [],
//   });
//   const [selectedCategory, setSelectedCategory] = useState("live");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/api/categorized")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Data:", data);
//         if (data?.status === "success") {
//           setCategorizedContests(data.categorizedContests);
//         } else {
//           setCategorizedContests({ complete: [], upcoming: [], live: [] });
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch contests.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <Loader />;
//   if (error) return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center mt-16 min-h-screen">
//         <div className="flex justify-center bg-gray-800 p-2 rounded-full w-[380px] shadow-md">
//           {["upcoming", "live", "complete"].map((category) => (
//             <button
//               key={category}
//               className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
//                 selectedCategory === category
//                   ? "bg-emerald-500 text-white shadow-lg"
//                   : "bg-gray-600 text-gray-300 hover:bg-gray-500"
//               }`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="w-full max-w-[1291px] mt-6">
//           {categorizedContests[selectedCategory].length === 0 ? (
//             <p className="text-white text-xl text-center mt-10">
//               No {selectedCategory} contests available.
//             </p>
//           ) : (
//             categorizedContests[selectedCategory].map((contest) => (
//               <div
//                 key={contest._id}
//                 className="flex flex-col items-center pt-3 w-[1291px] h-[215px] justify-center rounded-lg bg-stone-900 max-md:max-w-full mb-4"
//               >
//                 <header className="flex gap-5 self-start ml-3 text-xl font-semibold whitespace-nowrap text-stone-300">
//                   <img
//                     loading="lazy"
//                     src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738904644/nbbzv6vdg9mitp2mque8.png"
//                     className="object-contain shrink-0 w-7 aspect-square"
//                     alt="NSE Logo"
//                   />
//                   <h1 className="my-auto">{contest.exchange || "NSE"}</h1>
//                 </header>

//                 <hr className="mt-1.5 w-full border border-white border-solid" />

//                 <div className="flex flex-wrap gap-5 justify-between self-center items-center mt-6 w-full font-bold max-w-[1227px]">
//                   <div className="flex gap-10 self-start mt-1.5">
//                     <time className="text-5xl leading-none text-white">
//                       {contest.date || "N/A"}
//                     </time>
//                     <span className="text-2xl leading-loose text-neutral-400">
//                       {contest.day || "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap gap-[350px] text-2xl items-center justify-center leading-loose">
//                     <span className="text-stone-300">
//                       Ends At: {contest.endTime || "N/A"}
//                     </span>

//                     {/* Updated GO button with date-based routing */}
//                     <Link to={`/contentsdetails/${contest.date}`}>
//                       <button className="px-5 py-1 text-white bg-emerald-400 rounded-lg hover:bg-emerald-500 transition-all">
//                         GO &gt;&gt;
//                       </button>
//                     </Link>
//                   </div>
//                 </div>

//                 <footer className="flex overflow-hidden flex-wrap gap-5 justify-between py-1.5 pr-7 pl-5 mt-8 w-[1291px] h-[52px] rounded-lg bg-neutral-800">
//                   <div className="flex items-center gap-2">
//                     <span className="text-yellow-500 text-2xl">🏆</span>
//                     <p className="text-xl font-medium leading-10 text-stone-300">
//                       {contest.joinedCount || 0} Joined
//                     </p>
//                   </div>
//                   <p className="text-white text-xl">Status: {contest.status || "N/A"}</p>
//                 </footer>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default EventCard;











"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Loader = () => (
  <div className="flex justify-center items-center h-32">
    <div className="border-4 border-t-4 border-green-400 rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

const EventCard = () => {
  const [categorizedContests, setCategorizedContests] = useState({
    complete: [],
    upcoming: [],
    live: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("live");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/categorized")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setCategorizedContests(data.categorizedContests);
        } else {
          setCategorizedContests({ complete: [], upcoming: [], live: [] });
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch contests.");
        setLoading(false);
      });
  }, []);

  // Function to handle GO button click
  const handleGoClick = (date, exchange) => {
    navigate(`/contestdetails/date/${date}/exchange/${exchange}`);
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-16 min-h-screen">
        {/* Category Selector */}
        <div className="flex justify-start bg-black border-[#c5c5c5] border-[1px] p-1 gap-2 items-center rounded-full w-auto shadow-md">
          {["upcoming", "live", "complete"].map((category) => (
            <button
              key={category}
              className={`px-10 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-[#80db66] text-white  shadow-lg"
                  : "bg-[#1b1b1b] text-gray-300 hover:bg-[#1f1f1f]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Display Contests */}
        <div className="w-full max-w-[1291px] mt-6">
          {categorizedContests[selectedCategory].length === 0 ? (
            <p className="text-white text-xl text-center mt-10">No {selectedCategory} contests available.</p>
          ) : (
            categorizedContests[selectedCategory].map((contest) => (
              <div
                key={contest._id}
                className="flex flex-col items-center pt-3 w-[1291px] h-[215px] justify-center rounded-lg bg-stone-900 max-md:max-w-full mb-4"
              >
                {/* Header */}
                <header className="flex gap-5 self-start ml-3 text-xl font-semibold whitespace-nowrap text-stone-300">
                  <img
                    loading="lazy"
                    src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738904644/nbbzv6vdg9mitp2mque8.png"
                    className="object-contain shrink-0 w-7 aspect-square"
                    alt="Exchange Logo"
                  />
                  <h1 className="my-auto">{contest.exchange || "NSE"}</h1>
                </header>

                <hr className="mt-1.5 w-full border border-white border-solid" />

                {/* Main Content */}
                <div className="flex flex-wrap gap-5 justify-between self-center items-center mt-6 w-full font-bold max-w-[1227px]">
                  <div className="flex gap-10 self-start mt-1.5">
                    <time className="text-5xl leading-none text-white">{contest.date || "N/A"}</time>
                    <span className="text-2xl leading-loose text-neutral-400">{contest.day || "N/A"}</span>
                  </div>

                  <div className="flex flex-wrap gap-[350px] text-2xl items-center justify-center leading-loose">
                    <span className="text-stone-300">Ends At: {contest.endTime || "N/A"}</span>

                    <button
                      onClick={() => handleGoClick(contest.date, contest.exchange)}
                      className="px-5 py-1 text-white bg-emerald-400 rounded-lg hover:bg-emerald-500 transition-all"
                    >
                      GO &gt;&gt;
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <footer className="flex overflow-hidden flex-wrap gap-5 justify-between py-1.5 pr-7 pl-5 mt-8 w-[1291px] h-[52px] rounded-lg bg-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-2xl">🏆</span>
                    <p className="text-xl font-medium leading-10 text-stone-300">
                      {contest.joinedCount || 0} Joined
                    </p>
                  </div>
                  <p className="text-white text-xl">Status: {contest.status || "N/A"}</p>
                </footer>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventCard;












// Last Code 

// "use client";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// // Loader Component
// const Loader = () => (
//   <div className="flex justify-center items-center h-32">
//     <div className="border-4 border-t-4 border-green-400 rounded-full w-12 h-12 animate-spin"></div>
//   </div>
// );

// const EventCard = () => {
//   const [categorizedContests, setCategorizedContests] = useState({
//     complete: [],
//     upcoming: [],
//     live: []
//   });
//   const [selectedCategory, setSelectedCategory] = useState("live"); // Default to Live
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/api/categorized")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Data:", data);
//         if (data?.status === "success") {
//           setCategorizedContests(data.categorizedContests);
//         } else {
//           setCategorizedContests({ complete: [], upcoming: [], live: [] });
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch contests.");
//         setLoading(false);
//       });
//   }, []);

//   // useEffect(() => {
//   //   console.log("Fetching contests for date:", date);

//   //   fetch(`http://localhost:3000/api/contests/date/${date}`)
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       console.log("Fetched Data:", data);
//   //       if (data.status === "success" && data.contests) {
//   //         setContests(data.contests);
//   //       } else {
//   //         setContests([]);
//   //       }
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //       setError("Failed to fetch contests.");
//   //       setLoading(false);
//   //     });
//   // }, [date]);

//   if (loading) return <Loader />;
//   if (error) return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center mt-16 min-h-screen">
//         {/* Rounded Rectangle Tab Selector */}
//         <div className="flex justify-center bg-gray-800 p-2 rounded-full w-[380px] shadow-md">
//           {["upcoming", "live", "complete"].map((category) => (
//             <button
//               key={category}
//               className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
//                 selectedCategory === category
//                   ? "bg-emerald-500 text-white shadow-lg"
//                   : "bg-gray-600 text-gray-300 hover:bg-gray-500"
//               }`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Display Contests for Selected Category */}
//         <div className="w-full max-w-[1291px] mt-6">
//           {categorizedContests[selectedCategory].length === 0 ? (
//             <p className="text-white text-xl text-center mt-10">No {selectedCategory} contests available.</p>
//           ) : (
//             categorizedContests[selectedCategory].map((contest) => (
//               <div
//                 key={contest._id}
//                 className="flex flex-col items-center pt-3 w-[1291px] h-[215px] justify-center rounded-lg bg-stone-900 max-md:max-w-full mb-4"
//               >
//                 {/* Header */}
//                 <header className="flex gap-5 self-start ml-3 text-xl font-semibold whitespace-nowrap text-stone-300">
//                   <img
//                     loading="lazy"
//                     src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738904644/nbbzv6vdg9mitp2mque8.png"
//                     className="object-contain shrink-0 w-7 aspect-square"
//                     alt="NSE Logo"
//                   />
//                   <h1 className="my-auto">{contest.exchange || "NSE"}</h1>
//                 </header>

//                 <hr className="mt-1.5 w-full border border-white border-solid" />

//                 {/* Main Content */}
//                 <div className="flex flex-wrap gap-5 justify-between self-center items-center mt-6 w-full font-bold max-w-[1227px]">
//                   <div className="flex gap-10 self-start mt-1.5">
//                     {/* Date Formatting */}
//                     <time className="text-5xl leading-none text-white">
//                       {contest.date || "N/A"}
//                     </time>
//                     <span className="text-2xl leading-loose text-neutral-400">
//                       {contest.day || "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap gap-[350px] text-2xl items-center justify-center leading-loose">
//                     <span className="text-stone-300">
//                       Ends At: {contest.endTime || "N/A"}
//                     </span>

//                     <Link to={`/contentsdetails/${(contest.date)}`}>
//                       <button className="px-5 py-1 text-white bg-emerald-400 rounded-lg hover:bg-emerald-500 transition-all">
//                         GO &gt;&gt;
//                       </button>
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <footer className="flex overflow-hidden flex-wrap gap-5 justify-between py-1.5 pr-7 pl-5 mt-8 w-[1291px] h-[52px] rounded-lg bg-neutral-800">
//                   <div className="flex items-center gap-2">
//                     <span className="text-yellow-500 text-2xl">🏆</span>
//                     <p className="text-xl font-medium leading-10 text-stone-300">
//                       {contest.joinedCount || 0} Joined
//                     </p>
//                   </div>
//                   <p className="text-white text-xl">Status: {contest.status || "N/A"}</p>
//                 </footer>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default EventCard;











// "use client";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// const CountdownTimer = ({ initialTime }) => {
//   const parseTime = (timeString) => {
//     const [hours, minutes, seconds] = timeString.split("H : ").join("").split("M : ").join("").split("S").join("").split(" : ").map(Number);
//     return { hours, minutes, seconds };
//   };

//   const [timeLeft, setTimeLeft] = useState(parseTime(initialTime));

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         let { hours, minutes, seconds } = prevTime;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;
//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;
//             if (hours > 0) {
//               hours--;
//             } else {
//               clearInterval(timer);
//               return prevTime;
//             }
//           }
//         }
//         return { hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <time className="text-stone-300">
//       Ends in {timeLeft.hours}H : {timeLeft.minutes}M : {timeLeft.seconds}S
//     </time>
//   );
// };

// const EventCard = () => {
//   const [contest, setContest] = useState(null);

//   useEffect(() => {
//     const fetchContest = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/date-contests"); // Change this URL if needed
//         const data = await response.json();
//         if (data.length > 0) {
//           setContest(data[0]); // Assuming you want to display the first contest
//         }
//       } catch (error) {
//         console.error("Error fetching contest:", error);
//       }
//     };

//     fetchContest();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center mt-16 min-h-screen">
//         <div className="flex flex-col items-center pt-3 w-[1291px] h-[215px] justify-center rounded-lg bg-stone-900 max-md:max-w-full">
//           {/* Header */}
//           {contest && (
//             <>
//               <header className="flex gap-5 self-start ml-3 text-xl font-semibold whitespace-nowrap text-stone-300 max-md:ml-2.5">
//                 <img
//                   loading="lazy"
//                   src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738904644/nbbzv6vdg9mitp2mque8.png"
//                   className="object-contain shrink-0 w-7 aspect-square"
//                   alt="Exchange Logo"
//                 />
//                 <h1 className="my-auto">{contest.exchange}</h1>
//               </header>
//               <hr className="mt-1.5 w-full min-h-0 border border-white border-solid max-md:max-w-full" />

//               {/* Event Info */}
//               <div className="flex flex-wrap gap-5 justify-between self-center items-center mt-6 w-full font-bold max-w-[1227px] max-md:max-w-full">
//                 <div className="flex gap-10 self-start mt-1.5">
//                   <time className="text-5xl leading-none text-white basis-auto max-md:text-4xl">
//                     {contest.date}
//                   </time>
//                   <span className="text-2xl leading-loose text-neutral-400">{contest.day}</span>
//                 </div>

//                 <div className="flex flex-wrap gap-[350px] text-2xl items-center justify-center leading-loose max-md:max-w-full">
//                   <CountdownTimer initialTime={contest.endTime} />
//                   <Link to="/contentsdeatils">
//                     <button className="px-5 py-1 text-white bg-emerald-400 rounded-lg">GO &gt;&gt;</button>
//                   </Link>
//                 </div>
//               </div>

//               {/* Footer */}
//               <footer className="flex overflow-hidden flex-wrap gap-5 justify-between py-1.5 pr-7 pl-5 mt-8 w-[1291px] h-[52px] rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
//                 <div className="flex items-center gap-2">
//                   <span className="text-yellow-500 text-2xl">🏆</span>
//                   <p className="text-xl font-medium leading-10 text-stone-300">{contest.joinedCount} Joined</p>
//                 </div>
//                 <div className="flex gap-3 items-center text-2xl font-semibold leading-loose text-white">
//                   <img
//                     loading="lazy"
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/b84d5068a102141ee73df60d8e5fef870ef87f9ecd7c6f4a2dca8016d089a2a0?placeholderIfAbsent=true&apiKey=f5294c2440c849e09806e1501d656072"
//                     className="object-contain w-7 h-7"
//                     alt="Notification Icon"
//                   />
//                   <button className="border-none bg-transparent text-white text-lg font-medium hover:underline">
//                     Get Notified
//                   </button>
//                 </div>
//               </footer>
//             </>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default EventCard;
