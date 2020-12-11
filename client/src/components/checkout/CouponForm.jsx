import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { applyCoupon } from '../../functions/user'


const CouponForm = ({
  coupon,
  setCoupon,
  setDiscountError,
  discountError,
  totalAfterdiscount,
  setTotalAfterDiscount }) => {
  
  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

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
  return (
    <>
      <h4 className="text-center">クーポンを使用</h4>
      <br />
      {discountError && <h5 className="text-danger text-center">クーポンが確認できません。</h5>}
      {totalAfterdiscount > 0 && <h5 className="text-success text-center">クーポンが適用されました。</h5>}
      <br/>
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
    </>
  )
}

export default CouponForm
