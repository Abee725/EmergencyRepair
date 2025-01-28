import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white p-4'>
      <h1 className='text-2xl text-gray-500 mb-8'>
        CONTACT <span className='text-gray-700 font-semibold'>US</span>
      </h1>
      <div className='flex flex-col md:flex-row items-center md:items-start md:justify-between w-full max-w-4xl'>
        <img
          src={assets.contact_image}
          alt='Two people shaking hands in an auto repair shop'
          className='w-full md:w-1/2 mb-4 md:mb-0 md:mr-4'
        />
        <div className='w-full md:w-1/2'>
          <div className='mb-8'>
            <h2 className='text-lg font-bold text-gray-800 mb-2'>OUR OFFICE</h2>
            <p className='text-gray-600'>
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>
            <p className='text-gray-600'>Tel: (415) 555-0132</p>
            <p className='text-gray-600'>Email: azka@gmail.com</p>
          </div>
          <div>
            <h2 className='text-lg font-bold text-gray-800 mb-2'>
              CAREERS AT EMERGENCY REPAIR
            </h2>
            <p className='text-gray-600 mb-4'>
              Learn more about our teams and job openings.
            </p>
            <button className='px-4 py-2 border border-gray-800 text-gray-800 hover:bg-black hover:text-white transition-all duration-500'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
