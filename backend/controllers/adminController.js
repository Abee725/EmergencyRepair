//API for adding worker
import bcrypt from 'bcrypt'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import workerModel from '../models/workerModel.js'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
const addWorker = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      about,
      fees,
      address,
    } = req.body

    const imageFile = req.file

    console.log(
      {
        name,
        email,
        password,
        speciality,
        experience,
        about,
        fees,
        address,
      },
      imageFile
    )

    //checking all data to add worker
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees
    ) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    //email valid check
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' })
    }

    //password check
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please enter a strong password (length more than 8)',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    })
    const imageUrl = imageUpload.secure_url

    const workerData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    }

    const newWorker = new workerModel(workerData)
    await newWorker.save()

    res.json({ success: true, message: 'Doctor Saved Successfully' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api for admi login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid Credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to get all workers list for admin panel
const allWorkers = async (req, res) => {
  try {
    const workers = await workerModel.find({}).select('-password')
    res.json({ success: true, workers })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// api to get all appointment list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api for admin cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    //releasing the slot
    const { workerId, slotDate, slotTime } = appointmentData

    const workerData = await workerModel.findById(workerId)

    let slots_booked = workerData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    )

    await workerModel.findByIdAndUpdate(workerId, { slots_booked })

    res.json({ success: true, message: 'Appointment Cancelled' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api for get dashboard data
const adminDashboard = async (req, res) => {
  try {
    const workers = await workerModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      workers: workers.length,
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
export {
  addWorker,
  loginAdmin,
  allWorkers,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
}
