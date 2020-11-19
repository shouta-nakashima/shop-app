const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    const { name } = req.body
    //const category = await new Category({ name, slug: slugify(name) }).save()
    res.json(await new Sub({ name, slug: slugify(name) }).save())
  } catch (err) {
    // console.log(err);
    res.status(400).send('create err sub')
  }
}

exports.list = async(req, res) => {
  res.json(await Sub.find({}).sort({createdAt: -1}).exec())
}

exports.read = async(req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec()
  res.json(sub)
}

exports.update = async(req, res) => {
  try {
    const { name } = req.body
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).send('NO!! update err sub')
  }
}

exports.remove = async(req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (err) {
    res.status(400).send('NO!! delete err sub')
  }
}