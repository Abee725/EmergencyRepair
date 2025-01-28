// import React from 'react'

import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { workers } = useContext(AppContext)

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10 mb-10'>
      <p className='text-2xl font-semibold mb-6 text-gray-800'>
        My Appointments
      </p>
      <div className='space-y-6'>
        {workers.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row justify-between items-start border border-gray-300 rounded-lg p-4 shadow-sm'
          >
            {/* Image Section */}
            <div className='flex-shrink-0 mb-4 md:mb-0'>
              <img
                src={item.image}
                alt={item.name}
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>

            {/* Appointment Details */}
            <div className='flex-1 ml-0 md:ml-6'>
              <p className='text-lg font-semibold text-gray-800'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.speciality}</p>
              <p className='text-sm text-gray-600 mt-2'>
                <span className='font-medium text-gray-700'>Address:</span>{' '}
                {item.address.line1}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium text-gray-700'>Date & Time:</span>{' '}
                25, July, 2024 | 8:30 PM
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col space-y-2 mt-4 md:mt-0'>
              <button className='border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-primary hover:text-white'>
                Pay Online
              </button>
              <button className='border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-red-600 hover:text-white'>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
