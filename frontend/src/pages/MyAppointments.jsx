// import React from 'react'

import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getWorkersData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return (
      dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
    )
  }
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      })

      if (data.success) {
        //reverse is getting data from last date
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getWorkersData()
      } else {
        toast.error(data.message)
      }
      console.log(appointmentId)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initiatePayment = async (appointmentId, amount) => {
    console.log(
      `Initiating payment for appointment: ${appointmentId}, Amount: ${amount}`
    )

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/create-session`,
        { appointmentId, amount },
        {
          headers: {
            token,
          },
        }
      )

      if (data.success && data.sessionId) {
        // Redirect user to Stripe Checkout
        window.location.href = data.url
        console.log(data.url)
      } else {
        toast.error(data.message || 'Failed to create payment session.')
      }
    } catch (error) {
      console.error('Payment Error:', error)
      toast.error('Payment initiation failed.')
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10 mb-10'>
      <p className='text-2xl font-semibold mb-6 text-gray-800'>
        My Appointments
      </p>
      <div className='space-y-6'>
        {appointments.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row justify-between items-start border border-gray-300 rounded-lg p-4 shadow-sm'
          >
            {/* Image Section */}
            <div className='flex-shrink-0 mb-4 md:mb-0'>
              <img
                src={item.workerData.image}
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>

            {/* Appointment Details */}
            <div className='flex-1 ml-0 md:ml-6'>
              <p className='text-lg font-semibold text-gray-800'>
                {item.workerData.name}
              </p>
              <p className='text-sm text-gray-600'>
                {item.workerData.speciality}
              </p>
              <p className='text-sm text-gray-600 mt-2'>
                <span className='font-medium text-gray-700'>Address:</span>{' '}
                {item.workerData.address.line1}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium text-gray-700'>Date & Time:</span>{' '}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col space-y-2 mt-4 md:mt-0'>
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() =>
                    initiatePayment(item._id, item.workerData.fees)
                  }
                  className='sm:min-w-48 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-primary hover:text-white'
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='sm:min-w-48 border border-green-500 text-green-500 px-4 py-2 rounded'>
                  Payment Done
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='sm:min-w-48 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-red-600 hover:text-white'
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className='sm:min-w-48 border border-red-500 text-red-500 px-4 py-2 rounded'>
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className='sm:min-w-48 border border-green-500 text-green-500 px-4 py-2 rounded'>
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
