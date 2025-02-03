import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up') // Toggle between 'Sign Up' and 'Login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const url =
        state === 'Sign Up'
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`

      const userData =
        state === 'Sign Up' ? { name, email, password } : { email, password }

      const { data } = await axios.post(url, userData)

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success(`${state} successful!`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!')
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  })
  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <p className='text-2xl font-semibold mb-4'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className='text-gray-600 mb-6'>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book a service
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4'>
              <p className='block text-gray-700 mb-2'>Full Name</p>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className='mb-4'>
            <p className='block text-gray-700 mb-2'>Email</p>
            <input
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-6'>
            <p className='block text-gray-700 mb-2'>Password</p>
            <input
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-primary text-white py-2 rounded-lg hover:bg-yellow-400 transition duration-200'
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>

          <p className='mt-4 text-gray-600'>
            {state === 'Sign Up'
              ? 'Already have an account? '
              : 'Don’t have an account? '}
            <span
              onClick={() =>
                setState(state === 'Sign Up' ? 'Login' : 'Sign Up')
              }
              className='text-yellow-500 hover:underline cursor-pointer'
            >
              {state === 'Sign Up' ? 'Login here' : 'Sign up here'}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
