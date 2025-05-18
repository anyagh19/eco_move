import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Index';
import { motion } from 'framer-motion';

// Animation variants for staggered text animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function DonatePage() {
  const heading1 = 'Do you have household items or furniture that you no longer need? Instead of letting them go to waste, donate them to someone who can use them!';
  const heading2 = '“परहिताय यो दत्तं स दानं परमं स्मृतम्।” 🌿✨';
  const heading3 = 'At EcoMove, we connect generous donors like you with NGOs, recycling centers, and individuals in need. Your donation can make a real difference in someone’s life.';
  const words1 = heading1.split(' ');
  const words2 = heading2.split(' ');

  return (
    <div className='min-h-screen bg-top bg-contain  bg-no-repeat bg-gradient-to-r from-blue-500 via-green-500 to-blue-700'
      style={{
        backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/001/875/313/small_2x/social-support-activities-free-vector.jpg")',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Top Header Section */}
      <motion.div
        className='bg-gray-900 text-white py-2 px-4 text-center shadow-md'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='flex flex-wrap justify-center text-lg md:text-2xl lg:text-3xl font-bold max-w-6xl mx-auto'>
          {words1.map((word, index) => (
            <motion.span key={index} variants={wordVariants} className='mx-1'>
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Centered Button Section */}
      <motion.div
        className='flex flex-col items-center justify-center gap-12 py-24 px-6 text-center mt-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <Link to='/agency'>
            <Button className='bg-green-400 text-2xl md:text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600 shadow-lg mt-[80%]'>
              Donate Product
            </Button>
          </Link>
        </motion.div>
      </motion.div>

    </div>
  );
}

export default DonatePage;
