// import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
// import Register from './components/Register/Register';
// import Login from './components/Login/Login';
// import Home from './components/Home/Home';
// import Navbar from './components/Navbar/Navbar'
// // import Profile from './components/Profile';

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <nav className="mb-5">
//         {/* <Link to="/register" className="mr-4">Register</Link>
//         <Link to="/login" className="mr-4">Login</Link> */}
//         {/* <Link to="/profile">Profile</Link> */}
//       </nav>
//       <Router>
//          <Navbar />
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/navbar" element={<Navbar />} /> */}
        
//         {/* <Route path="/profile" element={<Profile />} /> */}
//       </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    
        // <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      
  );
}

export default App;
