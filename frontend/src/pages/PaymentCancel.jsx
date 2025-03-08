import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PaymentCancel() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000) // Redirect to home after 5 seconds
  }, [navigate])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-red-100'>
      <h1 className='text-3xl font-bold text-red-700'>Payment Canceled!</h1>
      <p className='mt-2 text-gray-600'>Your payment was not completed.</p>
      <p className='mt-4 text-gray-500'>Redirecting to the homepage...</p>
    </div>
  )
}
