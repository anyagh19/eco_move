import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../Index";

function Home() {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-12 p-5 pt-[5%]">
      {/* Header Section */}
      <div className="flex flex-col gap-6 justify-center items-center text-center">
        <h1 className="font-bold text-4xl">Welcome to Ecomove – Buy, Sell, Recycle & Donate with Ease!</h1>
      </div>

      {/* What is Ecomove? */}
      <div className="text-start flex flex-col gap-3">
        <h2 className="font-semibold text-2xl text-green-400">What is Ecomove?</h2>
        <p>
          Ecomove is your one-stop platform for buying and selling{" "}
          <span className="font-medium text-gray-300">second-hand household products and furniture</span>. We also help you{" "}
          <span className="font-medium text-gray-300">donate unused goods to NGOs</span> and{" "}
          <span className="font-medium text-gray-300">recycle old items responsibly</span>.
        </p>
      </div>

      {/* What We Offer */}
      <div className="text-start flex flex-col gap-3">
        <h2 className="font-semibold text-2xl text-green-400">What We Offer:</h2>
        <p><span className="font-medium text-gray-300">✅ Buy & Sell –</span> Find great deals on quality second-hand items or list your own pre-loved products for sale.</p>
        <p><span className="font-medium text-gray-300">✅ Recycle – </span> Dispose of old furniture and household materials in an eco-friendly way through verified recycling agencies.</p>
        <p><span className="font-medium text-gray-300">✅ Donate –</span> Share what you don’t need with those in need. Donate items to NGOs effortlessly.</p>
        <p><span className="font-medium text-gray-300">✅ Shifting Services –</span> Moving to a new place? We partner with trusted shifting companies to handle transportation for you.</p>
      </div>

      {/* Why Choose Ecomove? */}
      <div className="text-start flex flex-col gap-3">
        <h2 className="font-semibold text-2xl text-green-400">Why Choose Ecomove?</h2>
        <p><span className="text-green-300">🌱 Sustainable Living –</span> Reduce waste and promote a circular economy.</p>
        <p><span className="text-green-300">💰 Affordable Deals – </span> Buy quality products at a fraction of the original price.</p>
        <p><span className="text-green-300">📦 Hassle-Free Services – </span> From shifting to recycling, we’ve got you covered.</p>
        <p><span className="text-green-300">🤝 Community-Driven –</span> Help others by donating unused goods and making a difference.</p>
      </div>

      {/* Start Your Journey */}
      <div className="text-start flex flex-col gap-3">
        <h2 className="font-semibold text-2xl text-green-400">Start Your Journey Today!</h2>
        <p>✔ Browse Products</p>
        <p>✔ Sell Your Items</p>
        <p>✔ Donate or Recycle</p>
      </div>

      {/* Button Section */}
      <div className="text-center flex justify-center gap-3">
        {!userData ? (
          <Button className="bg-green-500 hover:bg-green-600 text-white py-4 px-10 rounded-full text-xl font-semibold transition duration-300">
            Get Started
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
