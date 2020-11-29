const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");
const { populate, aggregate } = require("../models/product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    //res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message
    })
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec()
  res.json(products)
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      slug: req.params.slug
    }).exec()
    res.json(deleted)
  } catch (err) {
    console.log(err);
    return res.status(400).send('NO! undelete product')
  }
}

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('subs')
    .exec()
    res.json(product)
}

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec()
    res.json(updated)
  } catch (err) {
    console.log('UPDATE ERR', err);
    //return res.status(400).send('NO!! Update')
    res.status(400).json({
      err: err.message
    })
  }
}

// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec()
//     res.json(products)
//   } catch (err) {
//     console.log(err);
//   }
// }

//with pagination
exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body
    const currentPage = page || 1
    const prePage = 3
    const products = await Product.find({})
      .skip((currentPage - 1) * prePage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(prePage)
      .exec()
    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec()
  res.json(total)
}

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // 誰が更新しているかの確認
  // 現在ログインしているユーザーがすでにこの製品に評価を追加しているかどうかを確認
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // ユーザーがまだ評価を残していない場合は、プッシュ
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // ユーザーがすでに評価を残している場合は、それを更新
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec()

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec()
  res.json(related)
}
//search and filter

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec()
  res.json(products)
}

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1]
      }
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()
    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

const handleCategory = async(req, res, category) => {
  try {
    const products = await Product.find({category})
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()
    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title",
        floorAverage: {
          $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};
exports.searchFilters = async (req, res) => {
  const {query, price, category, stars} = req.body

  if (query) {
    console.log('query', query);
    await handleQuery(req, res, query)
  }

  //price
  if (price !== undefined) {
    console.log('price ==>', price);
    await handlePrice(req, res, price)
  }

  //categories
  if (category) {
    console.log('category -->', category);
    await handleCategory(req,res,category)
  }

  //stars
  if (stars) {
    console.log('stars -->', stars);
    await handleStar(req,res,stars)
  }
}