import axios from 'axios'
import { useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') ? localStorage.getItem('aToken') : ''
  )
  const [workers, setWorkers] = useState([])
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getAllWorkers = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/all-workers',
        {},
        { headers: { aToken } }
      )
      if (data.success) {
        setWorkers(data.workers)
        console.log(data.workers)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeAvailability = async (workerId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/change-availability',
        { workerId },
        { headers: { aToken } }
      )
      if (data.success) {
        toast.success(data.message)
        getAllWorkers()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getAllApointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', {
        headers: { aToken },
      })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/cancel-appointment',
        { appointmentId },
        { headers: { aToken } }
      )
      if (data.success) {
        toast.success(data.message)
        setDashData((prevData) => ({
          ...prevData,
          latestAppointments: prevData.latestAppointments.map((item) =>
            item._id === appointmentId ? { ...item, cancelled: true } : item
          ),
        }))

        // Fetch fresh data from API
        await getAllApointments()
        console.log(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {
        headers: { aToken },
      })
      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const value = {
    aToken,
    setAToken,
    backendUrl,
    workers,
    getAllWorkers,
    changeAvailability,
    appointments,
    setAppointments,
    getAllApointments,
    cancelAppointment,
    dashData,
    getDashData,
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
