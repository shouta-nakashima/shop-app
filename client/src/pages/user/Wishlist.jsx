import React,{useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {DeleteOutlined} from '@ant-design/icons'


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    loadWishlist()
  }, [])
  
  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      //console.log(res);
      setWishlist(res.data.wishlist)
    })
  }

  const deleteWishlist = (productId) => {
    removeWishlist(productId,user.token).then((res) => {
      loadWishlist()
    })
  }

  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav/>
        </div>
        <div className="col">
          <h3 className="text-center mt-3 " >Wishlist</h3>
          {wishlist.length > 0 ? wishlist.map((p) => (
            <div key={p._id} className="col-md-8 alert alert-secondary mb-3" style={{margin: "auto"}}>
              <img src={p.images[0].url} alt="images" style={ {height: "100px", paddingRight: "20px"}}/>
              <Link to={`/product/${ p.slug }`}>{p.title}</Link>
              <span
                onClick={() => deleteWishlist(p._id)}
                className="btn btn-sm float-right mt-5"
              >
                <DeleteOutlined className="text-danger"/>
              </span>
            </div>
          )) : <h5 className="text-center mt-5">現在Wishlistはありません</h5>
          }
        </div>
      </div>
    </div>
  )
}

export default Wishlist
