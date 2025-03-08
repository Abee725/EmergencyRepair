import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  if (!dashData) return <p>Loading...</p>

  // 📊 Chart Data
  const barChartData = {
    labels: ['Workers', 'Bookings', 'Users'],
    datasets: [
      {
        label: 'Total Count',
        data: [dashData.workers, dashData.appointments, dashData.users],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
        borderRadius: 8,
      },
    ],
  }

  const pieChartData = {
    labels: ['Workers', 'Bookings', 'Users'],
    datasets: [
      {
        data: [dashData.workers, dashData.appointments, dashData.users],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
        hoverOffset: 10,
      },
    ],
  }

  return (
    <div className='m-5'>
      {/* 🏗 Layout: Left for Charts & Cards, Right for Latest Bookings */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* LEFT SIDE (2/3) - Summary Cards & Charts */}
        <div className='md:col-span-2 space-y-6'>
          {/* 🟢 Summary Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                icon: assets.worker_icon,
                count: dashData.workers,
                label: 'Workers',
              },
              {
                icon: assets.appointment_icon,
                count: dashData.appointments,
                label: 'Bookings',
              },
              { icon: assets.user_icon, count: dashData.users, label: 'Users' },
            ].map((item, index) => (
              <div
                key={index}
                className='flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 w-full'
              >
                <img src={item.icon} alt='' className='w-16 h-16 mb-3' />
                <p className='text-3xl font-bold text-gray-800'>{item.count}</p>
                <p className='text-gray-500 text-lg'>{item.label}</p>
              </div>
            ))}
          </div>

          {/* 📊 Charts */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-white shadow-lg rounded-lg p-5'>
              <h2 className='text-gray-700 font-semibold text-lg mb-3'>
                Statistics Overview
              </h2>
              <Bar data={barChartData} />
            </div>
            <div className='bg-white shadow-lg rounded-lg p-5'>
              <h2 className='text-gray-700 font-semibold text-lg mb-3'>
                User Distribution
              </h2>
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (1/3) - Latest Bookings */}
        <div className='bg-white shadow-lg rounded-lg p-5 h-fit'>
          <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b bg-gray-100'>
            <img src={assets.list_icon} alt='' className='w-6 h-6' />
            <p className='font-semibold text-gray-700 text-lg'>
              Latest Bookings
            </p>
          </div>

          <div className='divide-y'>
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors'
              >
                <img
                  src={item.workerData.image}
                  alt=''
                  className='w-14 h-14 rounded-full object-cover border'
                />
                <div className='flex flex-col flex-1 ml-4'>
                  <p className='text-gray-700 font-medium'>
                    {item.workerData.name}
                  </p>
                  <p className='text-gray-500 text-sm'>
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className='text-red-400 text-xs font-medium'>
                    {' '}
                    Cancelled{' '}
                  </p>
                ) : item.isCompleted ? (
                  <p className='text-green-400 text-xs font-medium'>
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src={assets.cancel_icon}
                    alt=''
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
