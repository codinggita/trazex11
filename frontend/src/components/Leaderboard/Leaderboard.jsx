import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const leaderboardData = [
  { id: 1, name: "Aryan", points: 3200, avatar: "https://res.cloudinary.com/dbrb9ptmn/image/upload/v1740474585/b3gmbz4wb4os17cf85if.png" },
  { id: 2, name: "Meera", points: 2800, avatar: "https://res.cloudinary.com/dbrb9ptmn/image/upload/v1740474585/b3gmbz4wb4os17cf85if.png" },
  { id: 3, name: "Raj", points: 2600, avatar: "https://res.cloudinary.com/dbrb9ptmn/image/upload/v1740474585/b3gmbz4wb4os17cf85if.png" },
  { id: 4, name: "Sneha", points: 2300, avatar: "https://res.cloudinary.com/dbrb9ptmn/image/upload/v1740474585/b3gmbz4wb4os17cf85if.png" },
];

const Leaderboard = () => {
  return (
    <>
      <Navbar />
      <div className="text-white flex items-center text-[24px] justify-center mt-10">27 February 2025</div>
      <div className="flex items-center justify-center mt-8">
         <img src=" https://res.cloudinary.com/dbrb9ptmn/image/upload/v1740597420/de5alhe3m1qfp8s05jlu.png" alt="" />
         </div>
      <Footer />
    </>
  );
};

export default Leaderboard;




// <div className="min-h-screen flex items-center justify-center bg-[#000000] p-6">
// <div className="w-[1130px] bg-[#1F1F1F] text-white rounded-2xl shadow-xl p-8">
//   <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">
//     🏆 Leaderboard (26 FEB)
//   </h2>

//   {/* Leaderboard List */}
//   <motion.div
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="space-y-4"
//   >
//     {leaderboardData.map((user, index) => (
//       <motion.div
//         key={user.id}
//         whileHover={{ scale: 1.05 }}
//         className="flex items-center justify-between bg-[#292929] p-5 rounded-xl shadow-md transition-all"
//       >
//         <div className="flex items-center">
//           <span className="text-xl font-bold w-8">{index + 1}.</span>
//           <img
//             src={user.avatar}
//             alt={user.name}
//             className="w-14 h-14 rounded-full border-2 border-gray-500"
//           />
//           <div className="ml-4">
//             <h3 className="text-lg font-semibold">{user.name}</h3>
//             <p className="text-gray-400">{user.points} pts</p>
//           </div>
//         </div>
//         {/* Emoji-based Ranking */}
//         <span className="text-2xl">
//           {index === 0 ? "🏆" : index === 1 ? "🥇" : index === 2 ? "🥈" : "🥉"}
//         </span>
//       </motion.div>
//     ))}
//   </motion.div>
// </div>
// </div>