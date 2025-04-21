import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../Index";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Images from assets folder (if you want to use local ones later)
// import BannerImage from "../assets/ecomove-banner.png";
// import FeaturesImage from "../assets/ecomove-features.png";

function Home() {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-16 p-5 pt-[5%]">
      
      {/* 🟢 Hero Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 items-center text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src="https://sdmntpreastus2.oaiusercontent.com/files/00000000-bc3c-61f6-9606-e1e5884c9ce2/raw?se=2025-04-18T19%3A54%3A00Z&sp=r&sv=2024-08-04&sr=b&scid=c05bc947-031b-5daf-9fd8-86c314906bf2&skoid=2f36945c-3adc-4614-ac2b-eced8f672c58&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-18T14%3A12%3A06Z&ske=2025-04-19T14%3A12%3A06Z&sks=b&skv=2024-08-04&sig=MWUkwkkTCb7F4odTcjMLU68msiOyN2Gs31Z9MwO1W5U%3D
"
          alt="EcoMove Banner"
          className="w-full max-w-5xl md:w-[40%] md:h-[40%] rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
        />
        
        <div className="md:flex md:flex-col">
        <motion.h1 className="font-bold text-4xl md:text-5xl text-green-400">
          Welcome to Ecomove ♻️
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-gray-300">
          Buy · Sell · Donate · Recycle – All in one place.
        </motion.p>
        </div>
      </motion.div>

      {/* 🟢 What We Offer */}
      <motion.div
        className="text-start flex flex-col gap-6 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        <motion.h2
          className="font-semibold text-2xl text-green-400 text-center"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          🚀 What We Offer
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-6 items-center"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-4">
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              🛍 <span className="font-medium text-gray-300">Buy & Sell –</span> Quality second-hand goods at great prices.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              ♻️ <span className="font-medium text-gray-300">Recycle –</span> Eco-friendly disposal via certified agencies.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              🎁 <span className="font-medium text-gray-300">Donate –</span> Give unused items to NGOs in need.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              🚚 <span className="font-medium text-gray-300">Shifting –</span> Trusted transport for hassle-free moving.
            </motion.p>
          </div>

          <motion.img
            src="https://sdmntpreastus2.oaiusercontent.com/files/00000000-c750-61f6-8b8d-433c8f12ca2e/raw?se=2025-04-18T20%3A05%3A35Z&sp=r&sv=2024-08-04&sr=b&scid=7b1e9cfc-53ae-5b13-abff-dfa0449abf82&skoid=2f36945c-3adc-4614-ac2b-eced8f672c58&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-18T04%3A36%3A06Z&ske=2025-04-19T04%3A36%3A06Z&sks=b&skv=2024-08-04&sig=1hoG5HNut5qla%2BTLC1kA2ciOCmk9NCo5TgPnHahyWbg%3D"
            alt="Ecomove Services"
            className="w-full h-[70%] max-w-md md:max-w-lg rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.div>

      {/* 🟢 Why Choose Us */}
      <motion.div
        className="text-start flex flex-col gap-5 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="font-semibold text-2xl text-green-400 text-center">
          💡 Why Ecomove?
        </h2>
        <div className="grid md:grid-cols-2 gap-3 text-center md:text-left">
          <p>
            🌱 <span className="text-green-300">Sustainable Living –</span> Join the green movement.
          </p>
          <p>
            💰 <span className="text-green-300">Affordable Deals –</span> Save big on household items.
          </p>
          <p>
            📦 <span className="text-green-300">All-in-One Platform –</span> From sale to shifting.
          </p>
          <p>
            🤝 <span className="text-green-300">Make an Impact –</span> Help others while decluttering.
          </p>
        </div>
      </motion.div>

      {/* 🟢 CTA Section */}
      <motion.div
        className="text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {!userData && (
          <Link to="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-green-500 hover:bg-green-600 text-white py-4 px-10 rounded-full text-xl font-semibold transition duration-300">
                Get Started 🚀
              </Button>
            </motion.div>
          </Link>
        )}
      </motion.div>
    </div>
  );
}

export default Home;
