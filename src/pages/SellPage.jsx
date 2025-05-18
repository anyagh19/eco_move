import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Index'
import { motion } from 'framer-motion'

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // Delay between each child animation
      delayChildren: 0.5,   // Delay before starting the children animations
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 }, // Start position and opacity
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // End position and opacity
}

function SellPage() {
  const heading = "Welcome to Ecomove, a platform where you can sell your second-hand products at the best price"
  const words = heading.split(' ') // Split heading into words

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-blue-700 bg-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-vector/people-buying-clothes-online-shop_1262-19293.jpg?semt=ais_hybrid&w=740")',
        backgroundBlendMode: 'overlay',
        backgroundSize: 'contain',  // or 'cover' based on your need
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '80vh',  // Set the height
        width: '100%',   // Set the width 
      }}


    >
      {/* Top Header Section */}
      <motion.div
        className='bg-gray-900 text-white py-6 px-4 text-center shadow-md'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-wrap justify-center text-xl md:text-2xl lg:text-3xl font-bold max-w-6xl mx-auto">
          {words.map((word, index) => (
            <motion.span key={index} variants={wordVariants} className="mx-1">
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Centered Button Section */}
      <motion.div
        className='flex flex-col items-center justify-center gap-12 py-24 px-6 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <Link to='/user-page/add-product'>
            <Button className='bg-green-400 text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600 shadow-lg mt-[100%]'>
              Sell Product
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SellPage
