import workerModel from '../models/workerModel.js'

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
export { changeAvailability, workerList }
