import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const coinStatuses = [

  { amount: 0, label: "Winning Coin", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a9a9dbceb0501e3fc86b66e6a57dfefbeddd840bd55d2aa6194988776332da8", coinUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/41ccfc38390615e5dcc4424b858b95819238dc694198d88f05c1c2f6787e3172" },
  { amount: 0, label: "Losses Coin", iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a9a9dbceb0501e3fc86b66e6a57dfefbeddd840bd55d2aa6194988776332da8", coinUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/41ccfc38390615e5dcc4424b858b95819238dc694198d88f05c1c2f6787e3172" },
];

const transactions = [
  { id: "0D567H4", title: "Stock Challenge Joined", status: "Completed", amount: 50, iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f7b6a7bdba7171930f03b1d79f872cd6e053cacd636698f1ab5f8cb3469b5205" },
];

const BalanceCard = () => {
  return (
    <>
    <Navbar />
    <main className="flex flex-col items-center p-6">
      {/* Balance Section */}
      <section className="w-[1130px] rounded-lg bg-[#1F1F1F] p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Balance Amount</h1>
          <div className="flex items-center gap-3 text-3xl font-bold text-white">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/41ccfc38390615e5dcc4424b858b95819238dc694198d88f05c1c2f6787e3172"
              className="w-8 h-8"
              alt="Balance icon"
            />
            <span>50</span>
          </div>
        </div>


<div className="grid grid-cols-2 gap-4 mt-6">
  {coinStatuses.map((status, index) => (
    <div key={index} className="flex items-center justify-between p-4 bg-[#2d2d2d] rounded-lg w-full">
      <div className="flex items-center gap-3">
        <img src={status.iconUrl} className="w-7 h-7" alt={status.label} />
        <span className="text-lg font-bold text-white">{status.label}</span>
      </div>
      <div className="flex items-center gap-2">
        <img src={status.coinUrl} alt="Coins" className="w-7 h-7" />
        <span className="text-lg font-bold text-white">{status.amount}</span>
      </div>
    </div>
  ))}
</div>

      </section>

      {/* Transactions Section */}
      <section className="w-[1130px] mt-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8adfcb9b5a750801c19b58f5e92509ec21a76c43b69b2ece2849b3c46e4f13a4"
            className="w-5 h-5"
            alt="Transaction icon"
          />
          Transaction
        </h2>
        <p className="text-center text-white text-sm mt-2">25 February 2025</p>

        <div className="mt-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#1f1f1f] rounded-lg mt-2">
              <div className="flex items-center gap-4">
                {/* Red Warning Icon */}
                
                <img src={transaction.iconUrl} alt="Icon" className="h-14 w-14" />
                <div>
                  <h3 className="text-xl text-white">{transaction.title}</h3>
                  <p className="text-sm text-stone-400 mt-3">Transaction ID : {transaction.id}</p>
                </div>
              </div>
              <span className="text-green-500 text-xl font-semibold">{transaction.status}</span>
              <div className="flex items-center gap-1 text-white">
                <span className="text-2xl font-extrabold">-</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d597581cad8a57f2b03689920ee68928ed438964d156c8cebab9a5e8ed0cb7f1"
                  className="w-7 h-7"
                  alt="Coin icon"
                />
                <span className="text-3xl font-bold">{transaction.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
};

export default BalanceCard;
