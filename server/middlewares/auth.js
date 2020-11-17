const admin = require('../firebase')

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