import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
          <p className='text-2xl font-semibold mb-4'>
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p className='text-gray-600 mb-6'>
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book a
            service
          </p>
          {state === 'Sign Up' && (
            <div className='mb-4'>
              <p className='block text-gray-700 mb-2' htmlFor='fullname'>
                Full Name
              </p>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.name)}
              />
            </div>
          )}
          <form>
            <div className='mb-4'>
              <p className='block text-gray-700 mb-2'>Email</p>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.email)}
              />
            </div>
            <div className='mb-6'>
              <p className='block text-gray-700 mb-2'>Password</p>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.password)}
              />
            </div>
            <button className='w-full bg-primary text-white py-2 rounded-lg hover:bg-yellow-400 transition duration-200'>
              Login
            </button>
            {state === 'Sign Up' ? (
              <p className='mt-4 text-gray-600'>
                Already have an account?{' '}
                <span
                  onClick={() => setState('Login')}
                  className='text-yellow-500 hover:underline cursor-pointer'
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className='mt-4 text-gray-600'>
                Already have an account?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className='text-yellow-500 hover:underline cursor-pointer'
                >
                  click here
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
