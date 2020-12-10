import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrder
} from '../functions/user'
import { toast } from 'react-toastify'
import {Address} from '../components/forms/index'

const Checkout = ({history}) => {

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState({})
  const [subAddress, setSubAddress] = useState("")
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [totalAfterdiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')
  const dispatch = useDispatch()
  const { user, COD } = useSelector((state) => ({ ...state }))
  const coupunTrueOrFalse = useSelector((state) => state.coupon)

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        //console.log('user cart res', JSON.stringify(res.data,null,4));
        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
      })
  },[])

  const saveAddressToDb = () => {
    if (subAddress === "") {
      alert('番地以降は必須項目です。')
      return false
    }
    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
        setAddressSaved(true)
        toast.success('配送先住所を保存しました。')
      }
    })
  }

  const applyDiscountCoupon = () => {
    //console.log('send coupon backend', coupon);
    applyCoupon(user.token, coupon)
      .then((res) => {
        //console.log('APPLY COUPON RES', res.data);
        //error
        if (res.data.err) {
          setDiscountError(res.data.err)
          dispatch({
            type: "COUPON_APPLIED",
            payload: false
          })
        }

        if (res.data) {
          setTotalAfterDiscount(res.data)
          dispatch({
            type: "COUPON_APPLIED",
            payload: true
          })
        }
        
      })
  }

  const showProductSummary = () => 
    products.map((p, i) => (
    <div key={i}>
      <p>
        {p.product.title} ({p.color}) x {p.count} = {(p.product.price * p.count).toLocaleString()}円
      </p>
    </div>
  ))

  const showApplyCoupon = () => (
    <div className="col text-center">
      <input 
        value={coupon}
        className="form-control"
        type="text"
        placeholder="クーポン名を入力"
        onChange={(e) => {
          setCoupon(e.target.value)
          setDiscountError('')
          setTotalAfterDiscount(0)
        }}
      />
      <button
        onClick={applyDiscountCoupon}
        className="btn btn-primary btn-raised mt-2"
        disabled={!coupon}
      >
        クーポンを適用
      </button>
    </div>
  )

  const emptyCart = () => {
    // localStorage からcartを削除
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    // rtedux からcartを削除
    dispatch({
      type: "ADD_TO_CART",
      payload: []
    })
    // dbからcartを削除
    emptyUserCart(user.token)
    .then((res) => {
      setProducts([])
      setTotal(0)
      setTotalAfterDiscount(0)
      setCoupon('')
      toast.success('カートの内容を削除しました')
    })
  }

  const setCashOrder = () => {
    createCashOrder(user.token, COD, coupunTrueOrFalse).then((res) => {
      //console.log('CASH DELIVERY RES', res);
      if (res.data.ok) {
        //local strageを空にする
        if(typeof window !== 'undefined') localStorage.removeItem("cart")
        //reduxを空にする
        dispatch({
          type: "ADD_TO_CART",
          payload: []
        })
        //couponをreset
        dispatch({
          type: "COUPON_APPLIED",
          payload: false
        })
        //CODをreset
        dispatch({
          type: "COD",
          payload: false
        })
        //DBを空にする
        emptyUserCart(user.token)
        toast.success('購入が完了しました。')
        setTimeout(() => {
          history.push('/user/history')
        }, 1000)
      }
    })
  }

  return (
    <div className="container-fluid" style={{paddingTop: "70px", minHeight: "575px"}}>
      <div className="row pt-3">
        <div className="col-md-6">
          <h4 className="text-center">配送先住所</h4>
          <br />
          <Address
            saveAddressToDb={saveAddressToDb}
            address={address}
            setAddress={setAddress}
            setSubAddress={setSubAddress}
          />
          <hr />
          <h4 className="text-center">クーポンを使用</h4>
          <br />
          {discountError && <h5 className="text-danger text-center">クーポンが確認できません。</h5>}
          {totalAfterdiscount > 0 && <h5 className="text-success text-center">クーポンが適用されました。</h5>}
          <br/>
          {showApplyCoupon()}
          <br />
        </div>
        <div className="col-md-5">
          <h4 className="text-danger text-center">ご注文内容の確認</h4>
          <hr />
          <p>現在{ products.length}つの商品が入っています</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>カートの合計：{ total.toLocaleString()}円</p>
          {totalAfterdiscount > 0 && 
            <p className="text-success ">
              クーポン適用後の合計：{(totalAfterdiscount * 1).toLocaleString()}円
            </p>
          }
          <div className="row">
            <div className="col-md-6">
              {COD ? (<button
                className="btn btn-primary btn-raised"
                disabled={!addressSaved || !products.length}
                onClick={setCashOrder}
              >
                代金引換で購入する
              </button>)
                : (<button
                className="btn btn-primary btn-raised"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push('/payment')}
              >
                オンライン決済で購入する
              </button>)}
            </div>
            <div className="col-md-6">
              <button
                onClick={emptyCart}
                disabled={!products.length}
                className="btn btn-danger btn-raised"
              >
                カートを空にする
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
