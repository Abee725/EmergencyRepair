import { createContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
export const WorkerContext = createContext()

const WorkerContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [wToken, setWToken] = useState(
    localStorage.getItem('wToken') ? localStorage.getItem('wToken') : ''
  )

  const [appointments, setAppointments] = useState([])

  const [dashData, setDashData] = useState(false)

  const [profileData, setProfileData] = useState(false)
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/worker/appointments',
        {
          headers: { wToken },
        }
      )
      console.log(backendUrl)

      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/worker/complete-appointment',
        { appointmentId },
        {
          headers: { wToken },
        }
      )

      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/worker/cancel-appointment',
        { appointmentId },
        {
          headers: { wToken },
        }
      )

      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/worker/dashboard', {
        headers: { wToken },
      })

      if (data.success) {
        setDashData(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/worker/profile', {
        headers: { wToken },
      })

      if (data.success) {
        setProfileData(data.profileData)
        console.log(data.profileData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    wToken,
    setWToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    getDashData,
    setDashData,
    profileData,
    setProfileData,
    getProfileData,
  }

  return (
    <WorkerContext.Provider value={value}>
      {props.children}
    </WorkerContext.Provider>
  )
}

export default WorkerContextProvider
