// import React from 'react'

import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Workers = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  const { workers } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(workers.filter((worker) => worker.speciality === speciality))
    } else {
      setFilterDoc(workers)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [workers, speciality])
  console.log(speciality)
  return (
    <div>
      <p className='text-gray-600'>Browse through the Worker specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilters ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text-sm tex-gray-600 ${
            showFilters ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <p
            onClick={() =>
              speciality === 'Cleaning'
                ? navigate('/workers')
                : navigate('/workers/Cleaning')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Cleaning' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Cleaning
          </p>
          <p
            onClick={() =>
              speciality === 'Painting'
                ? navigate('/workers')
                : navigate('/workers/Painting')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Painting' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Painting
          </p>
          <p
            onClick={() =>
              speciality === 'Repair'
                ? navigate('/workers')
                : navigate('/workers/Repair')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Repair' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Repair
          </p>
          <p
            onClick={() =>
              speciality === 'Shifting'
                ? navigate('/workers')
                : navigate('/workers/Shifting')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Shifting' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Shifting
          </p>
          <p
            onClick={() =>
              speciality === 'Plumbing'
                ? navigate('/workers')
                : navigate('/workers/Plumbing')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Plumbing' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Plumbing
          </p>
          <p
            onClick={() =>
              speciality === 'Electric'
                ? navigate('/workers')
                : navigate('/workers/Electric')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Electric' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Electric
          </p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
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
      </div>
    </div>
  )
}

export default Workers
