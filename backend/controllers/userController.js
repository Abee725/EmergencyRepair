import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import workerModel from '../models/workerModel.js'
import appointMentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
//API to register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'enter a valid email' })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'enter a strong password' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()
    //_id

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api for login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: 'user does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = (jwt.sign = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      ))
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid Credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId).select('-password')
    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to update userProfile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body
    const imageFile = req.file
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: 'Data Missing' })
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    })

    if (imageFile) {
      //upload to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      })
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageURL })
    }

    res.json({ success: true, message: 'Profile updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, workerId, slotDate, slotTime } = req.body
    const workerData = await workerModel.findById(workerId).select('-password')
    if (!workerData.available) {
      return res.json({ success: false, message: 'Worker not available' })
    }

    let slots_booked = workerData.slots_booked

    //check availability of slots

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete workerData.slots_booked

    const appointmentData = {
      userId,
      workerId,
      userData,
      workerData,
      amount: workerData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    }

    const newAppointment = new appointMentModel(appointmentData)
    await newAppointment.save()

    // save new slots data in workerData
    await workerModel.findByIdAndUpdate(workerId, { slots_booked })

    res.json({ success: true, message: 'Appointment Booked' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api to get user appointment
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body
    const appointments = await appointMentModel.find({ userId })

    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api to cancel appointments

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body
    const appointmentData = await appointMentModel.findById(appointmentId)

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unautorized Action' })
    }

    await appointMentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})
// api to make payment using razorpay
const paymentRazorPay = async (params) => {}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
}
