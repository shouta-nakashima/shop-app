const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email:email },
    { name: name, picture:picture },
    { new: true }
  )
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user)
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

// exports.createOrUpdateUser = (req, res) => {
//   res.json({
//     data: "hey you hit create-or-update-user API endpoint"
//   })
// }