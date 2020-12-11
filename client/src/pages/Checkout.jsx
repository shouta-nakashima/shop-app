import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  createCashOrder
} from '../functions/user'
import { toast } from 'react-toastify'
import {Address, CouponForm, ProductSummary, CheckoutButtons} from '../components/checkout/index'

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
          <CouponForm
            coupon={coupon}
            setCoupon={setCoupon}
            discountError={discountError}
            setDiscountError={setDiscountError}
            totalAfterdiscount={totalAfterdiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
          />
          <br />
        </div>
        <div className="col-md-5">
          <ProductSummary
            products={products}
            total={total}
            totalAfterdiscount={totalAfterdiscount}
          />
          <CheckoutButtons
            products={products}
            emptyCart={emptyCart}
            addressSaved={addressSaved}
            setCashOrder={setCashOrder}
            COD={COD}
          />
        </div>
      </div>
    </div>
  )
}

export default Checkout
