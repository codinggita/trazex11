import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const contests = [
  {
    id: 1,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1adff2cb2f31b63bd5b8b039a8e7127ca3fd67b86738bdab4faf6ea4085527cf",
    title: "Guaranteed Plus",
    amount: "26 Crores",
    spotsLeft: "500 Spots Left",
    totalSpots: "1000 Spots",
    entryFee: 50,
    prizepool: "26 Crores",
  },
  {
    id: 2,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1adff2cb2f31b63bd5b8b039a8e7127ca3fd67b86738bdab4faf6ea4085527cf",
    title: "Mega Contest",
    amount: "50 Crores",
    spotsLeft: "200 Spots Left",
    totalSpots: "500 Spots",
    entryFee: 100,
    prizepool: "50 Crores",
  },
  
];

const GuaranteedPlusHeader = ({ icon, title, amount, spotsLeft, totalSpots, entryFee, prizepool }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between self-center w-full max-w-[1241px]  max-md:max-w-full">
      <div className="flex flex-col self-start max-md:max-w-full">
        <div className="flex gap-5 self-start text-xl font-semibold text-white">
          <img
            loading="lazy"
            src={icon}
            className="object-contain shrink-0 my-auto aspect-[1.05] w-[21px]"
            alt="Guaranteed Plus Icon"
          />
          <h1>{title}</h1>
        </div>
        <div className="flex flex-wrap gap-5 justify-between items-start mt-6 max-md:max-w-full">
          <p className="mt-2.5 text-5xl font-bold leading-none text-white max-md:text-4xl">{amount}</p>
          {/* <p className="text-xs font-semibold leading-10 text-emerald-400">{spotsLeft}</p> */}
        </div>
      </div>
      {/* <p className="my-auto text-xs font-semibold leading-10 text-stone-300">{totalSpots}</p> */}
      <EntryFeeSection entryFee={entryFee} />
    </div>
  );
};

const EntryFeeSection = ({ entryFee, prizepool }) => {
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <div className="flex flex-col justify-center items-center px-8 py-2 w-full text-3xl font-bold leading-none rounded-lg bg-emerald-400 bg-opacity-10 max-md:px-5">
          <img className='h-[40px] w-[40px] ' src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1739714517/lupnj6inuaripexhfc4w.png"  alt="coins" />
      <h2 className='text-[#c5c5c5] font-medium mt-2'>Awaited!</h2>
      </div>
      <Link className='flex justify-center' to="/createteams"><button className="self-center mt-4 text-[21px] text-white bg-[#3FD68C] px-4 py-2 h-[47px] w-[157px] font-semibold rounded-md flex items-center justify-center">
        Join Now <span className="ml-2">➜</span>
      </button></Link>
    </div>
  );
};

const StatsSection = ( {prizepool} ) => {
  return (
    <>
    <div className="flex overflow-hidden flex-wrap gap-5 items-center justify-between px-7 py-1.5 mt-4 w-full font-medium rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 text-2xl max-md:max-w-full">
        <div className="flex flex-auto gap-5 items-center self-start text-stone-300">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8ead62c132ac2c7e2d772a0bbf895d37c7840641f982fac36ecf0a2d4cac257"
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[35px]"
            alt="Stats Icon"
          />
          <span className="self-stretch leading-relaxed">1.50 Cr</span>
          <div className="shrink-0 self-stretch my-auto w-px h-9 border border-white border-solid" />
          <span className="flex items-center justify-center w-8 h-8 text-lg font-semibold text-white border-2 border-stone-300 rounded-lg">
          M
          </span>
          <span className="self-stretch my-auto leading-tight">Upto 20</span>
          <div className="shrink-0 self-stretch my-auto w-px h-9 border border-white border-solid" />
        </div>
        <span className="leading-relaxed text-white">64%</span>
      </div>
      <div className="flex gap-7 self-start text-2xl leading-loose text-white">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/33d91e4d51c1d362e15a4dfa163f2ee77bde5b2a6d37d4eccdfc4997fb00ea46"
          className="object-contain shrink-0 my-auto w-8 aspect-[1.68]"
          alt="Total Amount Icon"
        />
        <span>{prizepool}</span>
      </div>
      
    </div>
    <TeamInfo />
    </>
  );
};



function TeamInfo() {
    return (
      <div className="max-w-[1341px] ">
        {/* Gradient Background Bar */}
        <div className="flex flex-wrap gap-5 justify-between text-2xl leading-loose w-full bg-[linear-gradient(to_right,#DFDFDF_0%,#D0D0D0_25%,#848484_100%)] rounded-lg px-2 py-1 shadow-md relative">
          {/* Text */}
          <div className="text-white px-4 font-semibold">Joined with 1 Team</div>
  
          {/* Dropdown Icon */}
          <img 
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/018b7148eec24a4f0c02deea20bf95b1509f2729a7c7ca51c2e113b078701463?placeholderIfAbsent=true&apiKey=f5294c2440c849e09806e1501d656072"
            className="object-contain shrink-0 my-auto mr-6 w-6 h-6 "
            alt="Dropdown"
          />
  
          {/* Small "T1" Label */}
          <div className="absolute left-5  -bottom-3 px-5 py-1 text-xs bg-[#666666] text-white rounded-full shadow-lg">
            T1
          </div>
        </div>
      </div>
    );
  }
  


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
      <section className="flex justify-center items-center py-10">
        <article className="flex flex-wrap gap-5 justify-between px-1 items-center w-[1191px] h-[142px] rounded-lg border bg-opacity-0 border-stone-300 max-md:max-w-full">
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
            <div className="flex gap-10 items-center text-stone-300">
              <img
                loading="lazy"
                src={viceCaptain.image}
                className="object-contain w-[90px]"
                alt={viceCaptain.name}
              />
              <div className="flex flex-col text-3xl font-semibold items-center text-stone-300">
                <span className="self-start">VC</span>
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
  
  
  
  

function MyContestTeam() {
  return (
    
    <>
    <Navbar />
    <div className='flex items-center justify-center'>
      <section className="rounded-none mt-10 w-[1291px]">
        {contests.map((contest) => (
          <article key={contest.id} className="flex flex-col pt-3.5 w-full rounded-lg bg-stone-900 max-md:max-w-full mb-5">
            <GuaranteedPlusHeader {...contest} />
            <StatsSection prizepool={contest.prizepool} />
            <MyTeam />
          </article>
        ))}
        
      </section>
    </div>

    <Footer />
    </>
    
  )
}

export default MyContestTeam