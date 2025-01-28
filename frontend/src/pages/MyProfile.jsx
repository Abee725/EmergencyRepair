import { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+11234567890',
    address: {
      line1: '57th Cross, Richmond, Circle, Church Road, London',
    },
    gender: 'Male',
    dob: '2000-01-20',
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10'>
      <div className='flex items-center space-x-6'>
        <img
          src={userData.image}
          alt={`Profile picture of ${userData.name}`}
          className='w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm'
        />
      </div>

      {isEdit ? (
        <input
          type='text'
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          className='mt-4 text-xl font-medium text-gray-800 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500'
        />
      ) : (
        <p className='text-2xl font-semibold mt-4'>{userData.name}</p>
      )}

      <hr className='my-4 border-gray-300' />

      <div>
        <h2 className='text-sm font-medium text-gray-500'>
          CONTACT INFORMATION
        </h2>
        <div className='mt-2'>
          <span className='font-medium'>Email:</span>{' '}
          <a
            href={`mailto:${userData.email}`}
            className='text-yellow-500 hover:underline'
          >
            {userData.email}
          </a>
        </div>
        <div className='mt-2'>
          <span className='font-medium'>Phone:</span>{' '}
          {isEdit ? (
            <input
              type='text'
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className='border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
          ) : (
            <span>{userData.phone}</span>
          )}
        </div>
        <div className='mt-2'>
          <span className='font-medium'>Address:</span>{' '}
          {isEdit ? (
            <input
              type='text'
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              value={userData.address.line1}
              className='border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
          ) : (
            <span>{userData.address.line1}</span>
          )}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='text-sm font-medium text-gray-500'>BASIC INFORMATION</h2>
        <div className='mt-2'>
          <span className='font-medium'>Gender:</span>{' '}
          {isEdit ? (
            <select
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
              className='border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          ) : (
            <span>{userData.gender}</span>
          )}
        </div>
        <div className='mt-2'>
          <span className='font-medium'>Birthday:</span>{' '}
          {isEdit ? (
            <input
              type='date'
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
              className='border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
          ) : (
            <span>{userData.dob}</span>
          )}
        </div>
      </div>

      <div className='mt-6 flex space-x-4'>
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className='px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-50'
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
