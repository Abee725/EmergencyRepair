import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { WorkerContext } from '../context/WorkerContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { wToken } = useContext(WorkerContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/admin-dashboard'}
          >
            <img src={assets.home_icon} />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/all-appointments'}
          >
            <img src={assets.appointment_icon} />
            <p className='hidden md:block'>Appointment</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/add-worker'}
          >
            <img src={assets.add_icon} />
            <p className='hidden md:block'>Add Worker</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/worker-list'}
          >
            <img src={assets.people_icon} />
            <p className='hidden md:block'>Workers List</p>
          </NavLink>
        </ul>
      )}
      {wToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/worker-dashboard'}
          >
            <img src={assets.home_icon} />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/worker-appointments'}
          >
            <img src={assets.appointment_icon} />
            <p className='hidden md:block'>Appointment</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/worker-profile'}
          >
            <img src={assets.people_icon} />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
