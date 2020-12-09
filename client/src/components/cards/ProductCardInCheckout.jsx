import React from 'react'
import {useDispatch} from 'react-redux'
import ModalImage from "react-modal-image";
import noImages from '../../image/no_image.png'
import { toast } from 'react-toastify'
import {CheckCircleOutlined, CloseCircleOutlined,CloseOutlined} from '@ant-design/icons'

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black","Brown","White","Silver","Blue"]
  const dispatch = useDispatch()

  const handleColorChange = (e) => {
    //console.log('color changed', e.target.value);

    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value
        }
      })
      //console.log('update cart', cart);
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: "ADD_TO_CART",
        payload: cart
      })
    }
  }

  const handleCountChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value
    if (count > p.quantity) {
      toast.error(`購入可能な最大数量は${p.quantity}個までです。`)
      return;
    }
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((product, i) => { 
        if (product._id === p._id) {
          cart[i].count = count
        }
        
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: "ADD_TO_CART",
        payload: cart
      })
    }
  }

  const handleDelete = () => {
    //console.log('delete', p._id);
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((product, i) => { 
        if (product._id === p._id) {
          cart.splice(i, 1)
        }
        
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: "ADD_TO_CART",
        payload: cart
      })
    }
  }

  return (
    <tbody>
      <tr>
        <td>
          <div style={{width: "100px", height: "auto"}}>
            {p.images.length
              ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />)
              : (<ModalImage small={noImages} large={noImages} />)}
          </div>
        </td>
        <td>{ p.title}</td>
        <td>{ p.price.toLocaleString()}円</td>
        <td>{ p.brand}</td>
        <td>
          <select 
          onChange={handleColorChange} 
          name="color" 
          className="form-control"
          >
            {p.color ? <option value={p.color}>{ p.color}</option> : <option>Select</option>}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </td>
        <td className="text-center " style={{maxWidth: '75px'}}>
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleCountChange}
          />
        </td>
        <td className=" text-center">
          {p.shipping === "配送可能"
            ? <CheckCircleOutlined className="text-success text-center" />
            : <CloseCircleOutlined className="text-danger"/>
          }
        </td>
        <td className="text-center"><CloseOutlined className="text-danger pointer" onClick={handleDelete}/></td>
      </tr>
    </tbody>
  )
}

export default ProductCardInCheckout
