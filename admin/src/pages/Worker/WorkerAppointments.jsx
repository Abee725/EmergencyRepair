import React, { useContext, useEffect } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const WorkerAppointments = () => {
  const {
    wToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(WorkerContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (wToken) {
      getAppointments()
    }
  }, [wToken])

  return (
    <div className='w-full max-w-6xl mx-auto p-4 sm:p-6'>
      <p className='mb-4 text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left'>
        All Appointments
      </p>

      <div className='bg-white border shadow-md rounded-lg text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
        {/* Header Row */}
        <div className='hidden sm:grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-100 font-medium text-gray-700 border-b'>
          <p>#</p>
          <p>Customer</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        {appointments.reverse().length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-4 px-4 sm:px-6 border-b items-center hover:bg-gray-50 transition'
            >
              <p className='font-medium'>{index + 1}</p>

              {/* Customer Info */}
              <div className='flex items-center gap-3'>
                <img
                  src={item.userData.image}
                  alt='Customer'
                  className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border object-cover'
                />
                <p className='text-gray-700 text-sm sm:text-base'>
                  {item.userData.name}
                </p>
              </div>

              {/* Payment Type */}
              <p
                className={`py-1 px-3 text-sm sm:text-base rounded-lg text-center font-medium ${
                  item.payment
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {item.payment ? 'Online' : 'Cash'}
              </p>

              {/* Age */}
              <p className='text-gray-700 text-sm sm:text-base'>
                {calculateAge(item.userData.dob)}
              </p>

              {/* Date & Time */}
              <p className='text-gray-600 text-sm sm:text-base'>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Fees */}
              <p className='font-semibold text-blue-600 text-sm sm:text-base'>
                {currency}
                {item.amount}
              </p>

              {/* Actions */}
              {item.cancelled ? (
                <p className='text-red-400 text-xs sm:text-sm font-medium text-center'>
                  Cancelled
                </p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs sm:text-sm font-medium text-center'>
                  Completed
                </p>
              ) : (
                <div className='flex flex-wrap sm:flex-nowrap gap-3 justify-center sm:justify-start'>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt='Cancel'
                    className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-80 transition'
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    src={assets.tick_icon}
                    alt='Approve'
                    className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-80 transition'
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='text-center py-6 text-gray-500 text-sm sm:text-base'>
            No Appointments Available
          </p>
        )}
      </div>
    </div>
  )
}

export default WorkerAppointments
