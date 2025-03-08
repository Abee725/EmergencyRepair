import { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { WorkerContext } from '../context/WorkerContext'
const Login = () => {
  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setWToken } = useContext(WorkerContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        // Admin Login (No location needed)
        const { data } = await axios.post(backendUrl + '/api/admin/login', {
          email,
          password,
        })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          console.log(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        // Worker Login (Location Required)
        if (!navigator.geolocation) {
          toast.error('Geolocation is not supported by your browser.')
          return
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            console.log('Latitude:', latitude)
            console.log('Longitude:', longitude)
            try {
              const { data } = await axios.post(
                backendUrl + '/api/worker/login',
                {
                  email,
                  password,
                  latitude, // Sending latitude
                  longitude, // Sending longitude
                }
              )

              if (data.success) {
                localStorage.setItem('wToken', data.token)
                setWToken(data.token)
                console.log(data.token)
              } else {
                toast.error(data.message)
              }
            } catch (error) {
              toast.error(
                error.response?.data?.message || 'Something went wrong!'
              )
            }
          },
          (error) => {
            toast.error('Error getting location: ' + error.message)
          }
        )
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex justify-center items-center min-h-screen bg-gray-100'
    >
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <p className='text-2xl font-semibold text-center mb-6 text-gray-800'>
          <span className='text-primary'>{state}</span> Login
        </p>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 font-medium mb-1'
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            type='email'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-gray-700 font-medium mb-1'
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id='password'
            type='password'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition'
        >
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setState('Doctor')}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setState('Admin')}
            >
              {' '}
              Click here
            </span>{' '}
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
