import React from 'react';
import './Aboutus.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


const ProjectCommitmentCard = () => {
  return (
    <div className="flex flex-col text-xl font-medium text-black  max-w-[313px]">
      <div className="flex relative flex-col px-8 pt-48 pb-12 w-full rounded-[10px] aspect-[0.822]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/65d6d5a2a49f74dd2d1f89124cf07731cfcf2de41865398b5193a6445f918725?placeholderIfAbsent=true&apiKey=f5294c2440c849e09806e1501d656072"
          alt="Background image representing project commitment"
          className="object-cover absolute inset-0 size-full"
        />
        <p className="relative z-10">
          I approach every project with unwavering commitment, ensuring precision,
          quality, and innovation in every solution I create.
        </p>
      </div>
    </div>
  );
};



function Aboutus() {
  return (
    <>
    <Navbar />
    
    <div className="about-sec1">
        <div className="illustration-bull">
            <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738761094/wbhbyyknmltwf6jslyuu.png" alt="Bull-Cartoon" height={550} width={550}/>
        </div>

        <div className="seq1">
            <div className="sec1-que">WHAT IS <span id='sec1-que'>TRAZEX11 ?</span></div>
            <div className="sec1-ans">At TRAZEX11, we bring the excitement of the stock market into the world of fantasy gaming. Our platform lets you create a fantasy portfolio using real-world stocks, where your strategy and market knowledge help you compete in exciting contests. Unlike traditional stock trading, there’s no real money involved—just skill, competition, and fun.</div>
            </div>
    </div>

    <div className="about-sec2">
        <div className="sec1-ans2">Our platform offers engaging daily, weekly, and special event-based contests, where you can compete with others, earn virtual coins, and climb the leaderboards. Whether you're a stock market enthusiast or a beginner, TRAZEX11 provides an exciting way to test your skills and learn in a risk-free environment.</div>
        <img style={{marginLeft: 50}} src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738762743/ymw9qyzf5txs1bb7kqr6.png" alt="Sport-Bull" height={550} width={550} />
    </div>

    {/* <ProjectCommitmentCard /> */}

    <Footer />
    </>
  )
}

export default Aboutus