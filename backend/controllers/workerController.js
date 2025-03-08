import workerModel from '../models/workerModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointMentModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {
  try {
    const { workerId } = req.body
    const workerData = await workerModel.findById(workerId)
    await workerModel.findByIdAndUpdate(workerId, {
      available: !workerData.available,
    })
    res.json({ success: true, message: 'Availablity Changed' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const workerList = async (req, res) => {
  try {
    const workers = await workerModel.find({}).select(['-password', '-email'])

    res.json({ success: true, workers })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const loginWorker = async (req, res) => {
  const { email, password, latitude, longitude } = req.body

  try {
    const worker = await workerModel.findOne({ email })
    if (!worker) return res.status(400).json({ error: 'Worker not found' })

    const isMatch = await bcrypt.compare(password, worker.password)
    if (isMatch) {
      // Update worker's location on login
      worker.latitude = latitude
      worker.longitude = longitude
      await worker.save()

      // Generate JWT token
      const token = jwt.sign({ id: worker._id }, process.env.JWT_SECRET)

      res.json({
        success: true,
        message: 'Login successful',
        token,
        worker: {
          workerId: worker.workerId,
          email: worker.email,
          latitude: worker.latitude,
          longitude: worker.longitude,
        },
      })
    } else {
      return res.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const appointmentsWorker = async (req, res) => {
  try {
    const { workerId } = req.body
    const appointments = await appointMentModel.find({ workerId })

    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const appointmentComplete = async (req, res) => {
  try {
    const { workerId, appointmentId } = req.body

    const appointmentData = await appointMentModel.findById(appointmentId)

    if (appointmentData && appointmentData.workerId === workerId) {
      await appointMentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      })
      return res.json({ success: true, message: 'Appointment Completed' })
    } else {
      return res.json({ success: false, message: 'Mark Failed' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const appointmentCancel = async (req, res) => {
  try {
    const { workerId, appointmentId } = req.body

    const appointmentData = await appointMentModel.findById(appointmentId)

    if (appointmentData && appointmentData.workerId === workerId) {
      await appointMentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      })
      return res.json({ success: true, message: 'Appointment Cancelled' })
    } else {
      return res.json({ success: false, message: 'Mark Failed' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const workerDashboard = async (req, res) => {
  try {
    const { workerId } = req.body

    const appointments = await appointMentModel.find({ workerId })

    let earnings = 0

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })
    let users = []

    appointments.map((item) => {
      if (!users.includes(item.userId)) {
        users.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      users: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    }

    res.json({ success: true, dashData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//get workerProfile
const workerProfile = async (req, res) => {
  try {
    const { workerId } = req.body
    const profileData = await workerModel.findById(workerId).select('-password')

    res.json({ success: true, profileData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//update worker profile
const updateWorkerProfile = async (req, res) => {
  try {
    const { workerId, fees, address, available } = req.body
    const profileData = await workerModel.findByIdAndUpdate(workerId, {
      fees,
      address,
      available,
    })

    res.json({ success: true, message: 'profile updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
export {
  changeAvailability,
  workerList,
  loginWorker,
  appointmentsWorker,
  appointmentComplete,
  appointmentCancel,
  workerDashboard,
  workerProfile,
  updateWorkerProfile,
}
