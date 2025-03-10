// import React from 'react'

import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedWorkers = (speciality, workerId) => {
  const { workers } = useContext(AppContext)
  const navigate = useNavigate()

  const [relWorker, setrelWorkers] = useState([])
  useEffect(() => {
    if (workers.length > 0 && speciality) {
      const workersData = workers.filter(
        (worker) => worker.speciality === speciality && worker._id !== workerId
      )
      setrelWorkers(workersData)
    }
  }, [workers, speciality, workerId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3x1 font-medium'>Top Workers to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted Workers.
      </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relWorker.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            key={index}
          >
            <img className='bg-yellow-100' src={item.image} alt='' />
            <div className='p-4'>
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available === true ? 'text-green-500' : 'text-gray-500'
                }`}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available === true ? 'bg-green-500' : 'bg-gray-500'
                  } rounded-full`}
                ></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate(`/workers`)
          scrollTo(0, 0)
        }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        more
      </button>
    </div>
  )
}

export default RelatedWorkers
