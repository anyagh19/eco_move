import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Buy Products",
    description: "Explore affordable, high-quality second-hand items ready to use.",
    image: "https://cdn-icons-png.flaticon.com/512/10704/10704890.png",
    discount: 20,
  },
  {
    title: "Sell Products",
    description: "Easily list your old furniture and household items to sell.",
    image: "https://cdn-icons-png.flaticon.com/512/10541/10541251.png",
    discount: 30,
  },
  {
    title: "Recycle Items",
    description: "Help the environment by recycling electronics, appliances, and more.",
    image: "https://cdn-icons-png.flaticon.com/512/2933/2933825.png",
  },
  {
    title: "Shifting Services",
    description: "Book expert movers to shift your belongings safely and on time.",
    image: "https://cdn-icons-png.flaticon.com/512/10414/10414229.png",
    discount: 25,
  },
  {
    title: "Donate Goods",
    description: "Contribute your old items to NGOs and those in need with ease.",
    image: "https://cdn-icons-png.flaticon.com/512/10407/10407320.png",
    discount: 15,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const ServiceCard = ({ title, description, image, discount }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.05 }}
    className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 relative transition-all duration-300 hover:shadow-2xl"
  >
    {discount && (
      <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-tr-xl rounded-bl-xl z-10">
        {discount}% OFF
      </div>
    )}
    <img src={image} alt={title} className="w-20 h-20 mx-auto mb-4" />
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <head>
        <title>Home | Ecomove</title>
      </head>

      <div className="text-center p-10 bg-gray-900">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to <span className="text-green-400">Ecomove</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          One-stop solution for <span className='font-medium'>second-hand deals, recycling, and shifting services</span>.
        </motion.p>
      </div>

      {/* Services */}
      <motion.div
        className="text-center px-4 py-12 bg-white text-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Our <span className="text-red-500">Services</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Simplify your life by <span className='font-bold'>buying, selling, recycling, donation, or shifting</span> with ease.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </motion.div>

      {/* Why Ecomove */}
      <motion.div
        className="text-center px-4 py-16 bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h2
          className="text-3xl font-bold text-white"
          variants={fadeUp}
        >
          Why <span className="text-green-400">Ecomove</span>?
        </motion.h2>
        <motion.p
          className="text-gray-300 my-2"
          variants={fadeUp}
        >
          Reliable, sustainable, and smart solutions for your everyday needs.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 px-4 md:px-16">
          {[
            {
              icon: "https://cdn-icons-png.flaticon.com/512/3213/3213487.png",
              title: "100% Safe Shifting",
              desc: "Guaranteed safety at every step of your move.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
              title: "Affordable & Assured",
              desc: "Quality services at pocket-friendly prices.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              title: "Expert Handling",
              desc: "Trained professionals for secure and damage-free handling.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="flex flex-col items-center text-white bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mb-4 text-white"
              />
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-300 text-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
