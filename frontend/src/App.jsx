// import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Workers from './pages/Workers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointment from './pages/Appointment'
import { ToastContainer } from 'react-toastify'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import MyMap from './components/MyMap'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workers' element={<Workers />} />
        <Route path='/workers/:speciality' element={<Workers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:workerId' element={<Appointment />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-cancel' element={<PaymentCancel />} />
        <Route path='/map' element={<MyMap />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
