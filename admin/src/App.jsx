// import React from 'react'

import { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllApointments from './pages/Admin/AllApointments'
import AddWorker from './pages/Admin/AddWorker'
import WorkersList from './pages/Admin/WorkersList'
import { WorkerContext } from './context/WorkerContext'
import WorkerDashboard from './pages/Worker/WorkerDashboard'
import WorkerAppointments from './pages/Worker/WorkerAppointments'
import WorkerProfile from './pages/Worker/WorkerProfile'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { wToken } = useContext(WorkerContext)

  return aToken || wToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <NavBar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin section */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllApointments />} />
          <Route path='/add-worker' element={<AddWorker />} />
          <Route path='/worker-list' element={<WorkersList />} />
          {/* Worker Section */}
          <Route path='/worker-dashboard' element={<WorkerDashboard />} />
          <Route path='/worker-appointments' element={<WorkerAppointments />} />
          <Route path='/worker-profile' element={<WorkerProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
