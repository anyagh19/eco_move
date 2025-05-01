import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Index'
import { motion } from 'framer-motion'

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function RecyclePage() {
  const heading = '♻ Recycle with Ecomove – Give Your Old Items a New Life!'
  const words = heading.split(' ')

  return (
    <div className='relative w-full min-h-screen flex flex-col items-center gap-12 bg-gray-50 bg-center bg-no-repeat bg-[url("https://tse4.mm.bing.net/th?id=OIP.tu6CuJdiub2sTtQHefqKUQHaEo&pid=Api&P=0&h=180")] bg-[length:70%]'>
      
      {/* Full-width animated heading */}
      <motion.div
        className='w-full bg-gray-900 py-6 px-4 md:px-16 flex flex-wrap justify-center items-center text-white text-4xl md:text-4xl font-bold text-center'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span key={index} variants={wordVariants} className='mx-2'>
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Subheading */}
      {/* <motion.p 
        className='text-xl md:text-2xl max-w-4xl text-center text-gray-800 px-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        Reduce waste, earn rewards, and help the environment by recycling your old items. 
        Schedule a pickup and let Ecomove take care of the rest!
      </motion.p> */}

      {/* Button */}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <Link to='/recycle-form'>
          <Button
            className='bg-green-500 text-2xl md:text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600 shadow-lg transition-all mt-[130%]'
          >
            Recycle Product
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

export default RecyclePage
