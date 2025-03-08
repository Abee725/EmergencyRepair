import jwt from 'jsonwebtoken'

//user authentication middleware
const authWorker = async (req, res, next) => {
  try {
    const { wtoken } = req.headers
    if (!wtoken) {
      return res.json({ success: false, message: 'Not Authorized' })
    }
    const token_decode = jwt.verify(wtoken, process.env.JWT_SECRET)

    req.body.workerId = token_decode.id

    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default authWorker
