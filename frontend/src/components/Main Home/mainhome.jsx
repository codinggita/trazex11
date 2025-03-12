import React, {useState} from 'react'
import './mainhome.css'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';


const faqData = [
    {
      question: "What is Fantasy Stock Market?",
      answer:
        "Fantasy Stock Market is a strategy-based virtual stock market game in which you can create a team of stocks and crypto and play in live tournaments worldwide. You rank based on profit made and win cash prizes based on your team's performances in the actual stock or crypto market.",
    },
    {
      question: "How does Trazex11 work?",
      answer:
        "We help you learn stock market basics from zero using our tournaments. These tournaments help you learn stock market basics and implement them in real-time. You compete with other users for winning positions to earn rewards.",
    },
    {
      question: "Is this a real stock trading platform?",
      answer:
        "No, this is a fantasy game that uses real stock market data to calculate points. You don’t invest real money, and there are no financial risks involved.",
    },
  ];

function mainhome() {
    const [activeIndex, setActiveIndex] = useState(null);
    
      const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      }
  return (

    <>
        <Navbar />
      
        <div className="hero-section">
          <div className="content">
            <h1 className='home-heading'>TRAZEX11</h1>
            <h2 className='home-subheading'>Play and Learn <br /> <span className='para2'> with <span className="highlight">Trazex11</span> </span></h2>
            <p className='home-para'>
              Build Your Dream Portfolio & Compete! <br />
              Pick your Favorite Stocks, compete in exciting <br />
              contests, and climb the Leaderboards.
            </p>
            {/* <Link to="/register" ><button className="signup-btn">Sign up for Free ↗</button></Link> */}
          </div>
          <div className="image-container">
            <img src="https://res-console.cloudinary.com/dbrb9ptmn/media_explorer_thumbnails/39f4821eaf276362d0697de76607c4ce/detailed" 
                 alt="Trazex11 Mascot" height={600} width={600} />
          </div>
        </div>
    
        <div className="work-section">How Does it Work?</div>
        <div className="work-ans"><span className='ans'>Fantasy stock market works just like a fantasy sports league – but with stocks instead of players! Select stocks to build your team, enter contests, and earn points based on real-time market movements. Compete against other players and see if your stock picks can outperform the rest!</span></div>
         
    
         <div className="play-head">How to <span className='play'>Play?</span></div>
         <div className='play-section'>
    
         <div className="step-img">
          <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738662481/c8zcesbvxbe2zbamtbek.png" alt="step-1 image" height={264} width={500} />
         </div>
    
          <div className="play-sec2">
         <div className="steps">
                <button class="step active">Step 1</button>
                <button class="step">Step 2</button>
                <button class="step">Step 3</button>
                <button class="step">Step 4</button>
            </div>
            
          <div className="step-info">
                <div className="text">
                    <h3 className='heading1'>Select A Tournament</h3>
                    <p className='para-1'>Choose a tournament you want to play.</p>
                </div>
          </div>
          </div>
    
         </div>
    
         <div className="info">
          <div className="info-head">Why Play Fantasy Stock Market?</div>
          <div id='para1' className="para1"><span className='para1a'>📈 Real-Time Stock Market Performance: Your team’s score updates based on actual stock market movements.</span></div>
          <div className="para1"><span className='para1a'>🏆 Exciting Contests: Daily, weekly, and special event-based competitions to test your skills.</span></div>
          <div className="para1"><span className='para1a'>💰 Earn Virtual Coins: Participate in contests, refer friends, and complete challenges to earn rewards.</span></div>
          <div className="para1"><span className='para1a'>📊 Leaderboards: Track your ranking and compete with friends and top players.</span></div>
          <div className="para1"><span className='para1a'>❓ No Risk, All Fun: No real money involved – just strategic gameplay and friendly competition!</span></div>
          <div className="para1"><span className='para1a'>🎯 Free to Play: 100% free with no hidden charges or premium features.</span></div>
    
         </div>
    
         <div className="review">
          <div className="review-head">User <span className='pre-head'>Testinomial</span></div>
          <div className="review-subhead">Thoughts from our users after using Trazex11</div>
         </div>
    
         <div className="testimonial-card">
            <div><img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738672520/i9svvlff1xdohpidulvg.png" alt="Review-Card" /></div>
            <div><img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738672520/ki8vzw6ibf5n9tulaekr.png" alt="Review-Card" /></div>
            <div><img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738672520/moqh4yxygenvj1omvx07.png" alt="Review-Card" /></div>
        </div>
    
        <div className="faqs">
        <div className="faqs">
          <div className="faq-heading"><span className='faqs-color'>Frequently Asked </span> <br />Questions</div>
        </div>
    
        <div className="faq-container">
            {/* <h2 className="faq-heading">Frequently Asked Questions</h2> */}
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question" onClick={() => toggleFAQ(index)}>
                  {item.question}
                  <span className={`arrow ${activeIndex === index ? "open" : ""}`}>
                    
                  </span>
                </button>
                <div className={`faq-answer ${activeIndex === index ? "show" : ""}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

          <Footer />
          </>
  )
}

export default mainhome