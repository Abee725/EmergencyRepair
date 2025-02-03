// import React from 'react'
import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const AddWorker = () => {
  const [workerImg, setWorkerImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [speciality, setSpeciality] = useState('Cleaning')
  const [address, setAddress] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!workerImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', workerImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('speciality', speciality)
      formData.append('address', JSON.stringify({ line1: address }))
      formData.append('fees', Number(fees))
      formData.append('about', about)

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-worker',
        formData,
        { headers: { aToken } }
      )
      if (data.success) {
        toast.success(data.message)
        setWorkerImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress('')
        setFees('')
        setAbout('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Worker</p>
      <div className='bg-whote px-8 py-8 border rounded w-full max-w-4x1 max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='worker-img'>
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={
                workerImg ? URL.createObjectURL(workerImg) : assets.upload_area
              }
              alt=''
            />
          </label>
          <input
            onChange={(e) => setWorkerImg(e.target.files[0])}
            type='file'
            id='worker-img'
            hidden
          />
          <p>
            Upload worker <br />
            picture{' '}
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Your Name</p>
              <input
                className='border rounded px-3 py-2'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Worker Email</p>
              <input
                className='border rounded px-3 py-2'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Worker Password</p>
              <input
                className='border rounded px-3 py-2'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className='border rounded px-3 py-2'
              >
                <option value='1 Year'>1 Year</option>
                <option value='2 Year'>2 Years</option>
                <option value='3 Year'>3 Years</option>
                <option value='4 Year'>4 Years</option>
                <option value='5 Year'>5 Years +</option>
              </select>
            </div>
          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className='border rounded px-3 py-2'
                name=''
                id=''
              >
                <option value='Cleaning'>Cleaning</option>
                <option value='Repair'>Repair</option>
                <option value='Painting'>Painting</option>
                <option value='Shifting'>Shifting</option>
                <option value='Plumbing'>Plumbing</option>
                <option value='Electric'>Electric</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input
                className='border rounded px-3 py-2'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='address'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input
                className='border rounded px-3 py-2'
                type='number'
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder='Fees'
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2'>About Worker</p>
          <textarea
            className='w-full px-4 pt-2 border rounded '
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='write about worker'
            rows={5}
          />
        </div>
        <button
          type='submit'
          className='bg-primary px-10 py-3 mt-4 text-white rounded-full'
        >
          Add Worker
        </button>
      </div>
    </form>
  )
}

export default AddWorker
