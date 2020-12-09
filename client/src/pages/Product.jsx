import React, { useState, useEffect } from 'react'
import { getProduct, productStar, getRelated} from '../functions/product'
import { ProductDetail } from '../components/cards/index'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/cards/index'



const Product = ({match}) => {
  const [product, setProduct] = useState({})
  const [star, setStar] = useState(0)
  const [related, setRelated] = useState([])
  const { user } = useSelector((state) => ({ ...state }))
  const {slug} = match.params

  useEffect(() => {
    loadSingleProduct()
  },[slug])

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      )
      existingRatingObject && setStar(existingRatingObject.star)
    }
  })

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data)
      // //load related
      getRelated(res.data._id).then((res) => setRelated(res.data))
    })
  }

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    //console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      //console.log("rating clicked", res.data);
      loadSingleProduct(); // 更新された評価をリアルタイムで表示
    });
  };
  return (
    <div className="container-fluid" style={{paddingTop: "70px"}}>
      <div className="row pt-4">
        <ProductDetail
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>関連商品</h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? related.map((r) =>
          <div key={r._id} className="col-md-4">
            <ProductCard product={r} />
          </div>)
          : <p className="text-center col">"No Products"</p>
        }
      </div>
    </div>
  )
}

export default Product
