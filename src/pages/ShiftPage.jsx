import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Index'
import { motion } from 'framer-motion'

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function ShiftPage() {
  const heading = "Welcome to Ecomove, a platform where you can Shift Your goods"
  const words = heading.split(' ')

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-blue-700 bg-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: 'url("https://www.atulyagati.com/wp-content/uploads/2018/12/Services-e-1.png")',
        backgroundBlendMode: 'overlay',
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
          <Link to='/shift-form'>
            <Button className='bg-green-400 text-2xl md:text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600 shadow-lg mt-[100%]'>
              Shift Product
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ShiftPage
