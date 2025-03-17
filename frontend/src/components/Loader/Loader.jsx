import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <>
    <div className="flex items-center justify-center h-screen ">
      <motion.div
        className="relative w-16 h-16"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 0], rotate: [0, 360, 360, 720] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-[#80db66] rounded-full shadow-lg"
            initial={{ opacity: 0.3, scale: 0.5 }}
            animate={{
              opacity: [0.3, 1, 1, 0.3],
              scale: [0.5, 1.2, 1.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            style={{
              top: `${i % 2 === 0 ? "10%" : "65%"}`,
              left: `${i < 2 ? "10%" : "65%"}`,
            }}
          />
        ))}
      </motion.div>
    </div>

    <MyTeam />
    </>
  );
};

export default Loader;


const MyTeam = () => {
    const [captain, setCaptain] = useState(null);
    const [viceCaptain, setViceCaptain] = useState(null);
  
    useEffect(() => {
      const storedCaptain = JSON.parse(localStorage.getItem("captain"));
      const storedViceCaptain = JSON.parse(localStorage.getItem("viceCaptain"));
  
      setCaptain(storedCaptain);
      setViceCaptain(storedViceCaptain);
    }, []);
  
    return (
      <section className="flex justify-center items-center py-2">
        <article className="relative flex flex-wrap gap-5 justify-between px-4 items-center w-[1191px] h-[142px] rounded-lg border bg-opacity-0 border-stone-300 max-md:max-w-full">
          {/* Icons at Top Right */}
          <div className="absolute top-2 right-4 flex gap-4">
            <img
              src="https://res-console.cloudinary.com/dbrb9ptmn/media_explorer_thumbnails/751e2605e971369327c520770d9b0247/detailed"
              alt="Icon 1"
              className="w-6 h-6 object-contain cursor-pointer"
            />
            <img
              src="https://res-console.cloudinary.com/dbrb9ptmn/media_explorer_thumbnails/95aeb7e595a45f011c4499c98abaf3b7/detailed"
              alt="Icon 2"
              className="w-6 h-6 object-contain cursor-pointer"
            />
          </div>
  
          {captain ? (
            <div className="flex flex-wrap gap-10 items-center text-3xl font-semibold">
              <span className="px-3.5 self-start rounded-lg -mt-[22px] bg-stone-300 text-stone-500">T1</span>
              <div className="flex gap-10 items-center">
                <img
                  loading="lazy"
                  src={captain.image}
                  className="object-contain w-[90px]"
                  alt={captain.name}
                />
                <div className="flex flex-col items-center text-stone-300">
                  <span className="self-start">C</span>
                  <span className="mt-2">{captain.name}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-white">No Captain Selected</p>
          )}
  
          {viceCaptain ? (
            <div className="flex gap-20 items-center text-stone-300"> {/* Increased gap for spacing */}
              <img
                loading="lazy"
                src={viceCaptain.image}
                className="object-contain w-[90px]"
                alt={viceCaptain.name}
              />
              <div className="flex flex-col text-3xl font-semibold items-center mr-16 text-stone-300">
                <span className="self-start ">VC</span>
                <span className="mt-2">{viceCaptain.name}</span>
              </div>
            </div>
          ) : (
            <p className="text-white">No Vice-Captain Selected</p>
          )}
        </article>
      </section>
    );
  };
  
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const GoldJewelryLoader = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsOpen(true);
//       setTimeout(() => setIsOpen(false), 2000);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-100 to-yellow-300">
//       <motion.div
//         className="relative w-40 h-40 flex justify-center items-center"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         {/* Jewelry Box Bottom */}
//         <motion.div
//           className="absolute w-28 h-20 bg-yellow-800 rounded-lg shadow-lg"
//           initial={{ y: 0 }}
//           animate={{ y: isOpen ? 20 : 0 }}
//           transition={{ duration: 0.7 }}
//         ></motion.div>
        
//         {/* Jewelry Box Top */}
//         <motion.div
//           className="absolute w-28 h-10 bg-yellow-900 rounded-lg shadow-md"
//           initial={{ y: 0 }}
//           animate={{ y: isOpen ? -24 : 0 }}
//           transition={{ duration: 0.7 }}
//         ></motion.div>
        
//         {/* Ring */}
//         <motion.div
//           className="absolute flex flex-col items-center"
//           initial={{ opacity: 0, scale: 0.5, y: 10 }}
//           animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5, y: isOpen ? -30 : 10 }}
//           transition={{ delay: 0.5, duration: 0.7 }}
//         >
//           <div className="w-12 h-12 border-4 border-yellow-400 rounded-full ring-4 ring-yellow-300"></div>
//           <div className="w-4 h-4 bg-white rounded-full shadow-xl mt-[-10px] animate-pulse"></div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default GoldJewelryLoader;
