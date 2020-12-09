import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import '../stripe.css'
import StripeCheckout from '../components/StripeCheckout'

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>ご購入決済の確認</h4>
      <p className="text-danger">※このサイトはデモサイトです。実際の商品購入はできません。<br />また、実在するカード情報の入力はお控えください。</p>
      <p>テストカード：4242 4242 4242 4242</p>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          
          <StripeCheckout/>
        </div>
      </Elements>
    </div>
  )
}

export default Payment
