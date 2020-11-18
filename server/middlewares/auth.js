const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async (req, res, next) => {
  // 
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
    console.log('firebase user auth check OK!!!');
    req.user = firebaseUser
    next()
  } catch (err) {
    console.log('con', err);
    res.status(401).json({
      err: 'ERROR!!!'
    })
  }
}

exports.adminCheck = async(req, res, next) => {
  const { email } = req.user
  const adminUser = await User.findOne({ email }).exec()
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "管理者専用です。アクセスが拒否されました。"
    })
  } else {
    next()
  }
}