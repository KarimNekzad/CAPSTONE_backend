const jwt = require('jsonwebtoken')

checkauth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' })
    }
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'secret') // can use a JWT_KEY variable here from .env with secret instead of hard-coding
    req.userData = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token!',
    })
  }
}

module.exports = {
  checkauth,
}
