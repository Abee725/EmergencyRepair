// import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedWorkers from '../components/RelatedWorkers'

const Appointment = () => {
  const { workerId } = useParams()
  const { workers, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [workerInfo, setWorkerInfo] = useState(null)
  const [workerSlots, setworkerSlots] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')

  const fetchWorkerInfo = async () => {
    const workerInfo = workers.find((worker) => worker._id === workerId)
    setWorkerInfo(workerInfo)
    console.log(workerInfo)
  }

  const getAvailableSlots = async () => {
    setworkerSlots([])

    //getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      //setting Hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        //add a slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        })

        //increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setworkerSlots((prev) => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    fetchWorkerInfo()
  }, [workers, workerId])

  useEffect(() => {
    getAvailableSlots()
  }, [workerInfo])

  useEffect(() => {
    console.log(workerSlots)
  }, [workerSlots])

  return (
    workerInfo && (
      <div>
        {/* -----worker details ---------*/}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img
              className='bg-primary w-full sm:max-w-72 rounded-lg'
              src={workerInfo.image}
              alt=''
            />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* name,deg,eexperience---------- */}
            <p className='flex items-center gap-2 text-2x1 font-medium text-gray-900'>
              {workerInfo.name}{' '}
              <img className='w-5' src={assets.verified_icon} alt='' />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{workerInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>
                {workerInfo.experience}
              </button>
            </div>
            {/* ------- Doctor About ------ */}
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                About <img src={assets.info_icon} alt='' />
              </p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
                {workerInfo.about}
              </p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment Fee:{' '}
              <span className='text-gray-600'>
                {currencySymbol}
                {workerInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking slots</p>
          <div className='flex gap-2 items-center w-full overflow-x-scroll mt-4'>
            {workerSlots.length &&
              workerSlots.map((item, index) => (
                <div
                  onClick={() => setslotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? 'bg-primary text-white'
                      : 'border border-gray-200'
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {workerSlots.length &&
              workerSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setslotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? 'bg-primary text-white'
                      : 'text-gray-400 border border-gray-300'
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className='bg-primary text-white text-sm  font-light px-14 py-3 rounded-full my-6'>
            Book an appointment
          </button>
        </div>
        {/* Listing workers */}
        <RelatedWorkers
          workerId={workerId}
          speciality={workerInfo.speciality}
        />
      </div>
    )
  )
}

export default Appointment
