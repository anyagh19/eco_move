import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Index'
import { motion } from 'framer-motion'

// Animation variants for staggered text animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // Delay between each child animation
      delayChildren: 0.5, // Delay before starting the children animations
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 }, // Start position and opacity
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // End position and opacity
}

function DonatePage() {
  const heading1 = 'Do you have household items or furniture that you no longer need? Instead of letting them go to waste, donate them to someone who can use them!'
  const heading2 = '“परहिताय यो दत्तं स दानं परमं स्मृतम्।” 🌿✨'
  const heading3 = 'At EcoMove, we connect generous donors like you with NGOs, recycling centers, and individuals in need. Your donation can make a real difference in someone’s life.'
  
  const words1 = heading1.split(' ')
  const words2 = heading2.split(' ')
  const words3 = heading3.split(' ')

  return (
    <motion.div 
      className='flex flex-col items-center justify-center min-h-screen gap-16 bg-gray-50 bg-center bg-no-repeat bg-cover'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Heading 1 animation */}
      <motion.div
        className="text-4xl text-center font-bold"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words1.map((word, index) => (
          <motion.span key={index} variants={wordVariants} className="mx-1">
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Heading 2 animation */}
      <motion.div
        className="text-5xl text-center font-bold mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words2.map((word, index) => (
          <motion.span key={index} variants={wordVariants} className="mx-1">
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Heading 3 animation */}
      <motion.div
        className="text-3xl text-center font-semibold mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words3.map((word, index) => (
          <motion.span key={index} variants={wordVariants} className="mx-1">
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Button Animation */}
      <Link to='/agency'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <Button className='bg-green-400 text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600 mt-10'>
            Donate Product
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default DonatePage
