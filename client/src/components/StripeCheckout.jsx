import React,{useState, useEffect} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { createPaymentIntent } from '../functions/stripe'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'
import shoppingImage from '../image/card.jpg'

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch()
  const {user, coupon} = useSelector((state) => ({...state}))

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")
  const [cartTotal, setCartTotal] = useState(0)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [payable, setPayable] = useState(0)

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    createPaymentIntent(user.token, coupon)
      .then((res) => {
        console.log('create payment intent', res.data);
        setClientSecret(res.data.clientSecret)
        setCartTotal(res.data.cartTotal)
        setTotalAfterDiscount(res.data.totalAfterDiscount)
        setPayable(res.data.payable)
      })
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value
        }
      }
    })
    if (payload.error) {
      setError(`支払いに失敗しました。${ payload.error.message }`)
      setProcessing(false)
    } else {
      //console.log(JSON.stringify(payload, null, 4));
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  const handleChange = async (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {
        !succeeded && <div>
          {coupon && totalAfterDiscount !== undefined
            ? (
              <p className="alert alert-success">{`クーポンが適用されています。お支払い金額が${totalAfterDiscount.toLocaleString()}円に変更されました。`}</p>
          ) : (<p className="alert alert-danger">クーポンは適用されていません</p>)}
        </div>
      }
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              alt="images"
              src={shoppingImage}
              style={{ height: '200px', objectFit: 'cover', marginBottom: '-50px' }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br />
              カートの合計：{cartTotal.toLocaleString()}円
            </>,
            <>
              <CheckOutlined className="text-info" /> <br />
              お支払い金額：{payable.toLocaleString()}円
            </>,
          ]}
        />
      </div>
      <form
        id="payment-form"
        className="stripe-form"
        onSubmit={handleSubmit}
      >
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing
              ? <div className="spinner" id="spinner"></div>
              : "Pay"
            }
          </span>
        </button>
        <br />
        {error && <div className="card-error" role="alert">{error}</div>}
        <p className=
          {succeeded
            ? "result-message"
            : "result-message hidden"}
        >
          お支払いが完了しました。
          <Link to="/user/history">購入履歴で確認してください。</Link>
        </p>
      </form>
    </>
  )
}

export default StripeCheckout
