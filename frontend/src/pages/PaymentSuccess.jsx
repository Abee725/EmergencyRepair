import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

export default function PaymentSuccess() {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [appointments, setAppointments] = useState([])
  const [appointmentDetails, setAppointmentDetails] = useState(null)

  const appointmentId = searchParams.get('appointmentId')

  const updatePaymentStatus = async () => {
    if (!appointmentId) return

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-payment`,
        { appointmentId, paymentStatus: true },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.success(data.message)
      }

      getUserAppointments()
    } catch (error) {
      console.error('Error updating payment:', error)
      toast.error(error.response?.data?.message || 'Payment update failed')
    }
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      })

      if (data.success) {
        const sortedAppointments = data.appointments.reverse()
        setAppointments(sortedAppointments)

        // Find the specific appointment
        const appointment = sortedAppointments.find(
          (app) => app._id === appointmentId
        )
        setAppointmentDetails(appointment)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast.error('Failed to fetch appointment details')
    }
  }

  useEffect(() => {
    updatePaymentStatus()
  }, [appointmentId])

  if (!appointmentDetails) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <p className='text-lg text-gray-700'>Loading payment details...</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center border border-gray-200'>
        <h1 className='text-2xl font-bold text-green-700 mt-4'>
          Payment Successful!
        </h1>
        <p className='mt-2 text-gray-600'>Thank you for your payment.</p>

        {/* Receipt Details */}
        <div className='mt-6 text-left'>
          <h2 className='text-lg font-semibold text-gray-800 border-b pb-2'>
            Receipt
          </h2>

          {/* User Details */}
          <div className='mt-4'>
            <p className='text-sm text-gray-500'>Billed To:</p>
            <p className='font-medium'>{appointmentDetails.userData.name}</p>
            <p className='text-gray-500 text-sm'>
              {appointmentDetails.userData.email}
            </p>
          </div>

          {/* Worker Details */}
          <div className='mt-4'>
            <p className='text-sm text-gray-500'>Service Provider:</p>
            <div className='flex items-center space-x-2'>
              <img
                src={appointmentDetails.workerData.image}
                alt={appointmentDetails.workerData.name}
                className='w-10 h-10 rounded-full border border-gray-300'
              />
              <div>
                <p className='font-medium'>
                  {appointmentDetails.workerData.name}
                </p>
                <p className='text-gray-500 text-sm'>
                  {appointmentDetails.workerData.speciality} -{' '}
                  {appointmentDetails.workerData.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className='mt-4'>
            <p className='text-sm text-gray-500'>Appointment Date & Time:</p>
            <p className='font-medium'>
              {appointmentDetails.slotDate} at {appointmentDetails.slotTime}
            </p>
          </div>

          {/* Payment Info */}
          <div className='mt-4 bg-green-100 text-green-700 p-3 rounded-lg'>
            <p className='font-semibold'>
              Total Paid: ₹{appointmentDetails.amount}
            </p>
          </div>
        </div>

        <p className='mt-6 text-gray-600 text-sm text-center'>
          Take a screenshot for your reference. Once done,{' '}
          <span
            onClick={() => navigate('/')}
            className='text-blue-600 font-semibold cursor-pointer hover:underline'
          >
            click here to go to the homepage.
          </span>
        </p>
      </div>
    </div>
  )
}
