import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    if (!token) {
      toast.error('Authorization token is missing!')
      return
    }
    console.log('Token:', token)
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    userData && (
      <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10'>
        <div className='flex items-center space-x-6'>
          {isEdit ? (
            <label htmlFor='image'>
              <div className='inline-block relative cursor-pointer'>
                <img
                  className='w-36 rounded opacity-75'
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=''
                />
                <img
                  className='w-10 absolute bottom-12 right-12'
                  src={image ? '' : assets.upload_icon}
                  alt=''
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type='file'
                id='image'
                hidden
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt={`Profile picture of ${userData.name}`}
              className='w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm'
            />
          )}
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
          <h2 className='text-sm font-medium text-gray-500'>
            BASIC INFORMATION
          </h2>
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
              onClick={updateUserProfileData}
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
  )
}

export default MyProfile
