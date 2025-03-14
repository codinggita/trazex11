import React from 'react'

function Footer() {
  return (
    <>
          <div className="footer1">
      <div className="footer">
        <div className="sec1">
        <div className="footerlogo"><img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738654508/oj7qqwdo1uimyam74bvh.png" alt="Trazex-Logo" /></div>
        <div className="footer-para">Play, Learn and Win  ❤️</div>
        <div className="social">
          <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738677165/zxdljvdvckcgej4mol55.png" alt="Twitter" />
          <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738677165/en3b5hyjm6mwst2bpscx.png" alt="Instagram" />
          <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738677165/yst7spl5vmuu7t1ma33f.png" alt="LinkedIn" />
          <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738677166/qt7j1cjy8syu5vo3weny.png" alt="Youtube" />
        </div>
        </div>

        {/* <div className="sec2"> */}

          <div className="sec-part1">
            <div className="fhead1">Quick Lines</div>
            <div id='fpara1' className="fpara1">Home</div>
            <div className="fpara1">Blogs</div>
            <div className="fpara1">About us</div>
            <div id='fpara2' className="fpara1">Try app for Free!</div>
          </div>

          <div className="sec-part2">
          <div className="fhead1">Our Patners</div>
          <img className='trading-view' src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738678969/b3wcldjfqobpfz9wdheq.png" alt="Trading View" />
          <div className="fpara2">StockPe has partnered with TradingView for its charting technology. A comprehensive trading platform offering market data, widgets, analytical tools and a real time economic calendar to track key financial events.</div>
          </div>

          <div className="sec-part3">
            <div className="fhead1">Support</div>
            <div id='fpara1' className="fpara1">FAQs</div>
            <div className="fpara1">Email us</div>
            <div className="fpara1">Privacy Policy</div>
            <div className="fpara1">Terms & Conditions</div>
          </div>
        {/* </div> */}
      </div>
      <div className="copy">© 2025 Trazex. All rights reserved.</div>
      <div className="alert">This platform is for entertainment purposes only. No real money is involved in contests.</div>
      </div>
    </>
  )
}

export default Footer