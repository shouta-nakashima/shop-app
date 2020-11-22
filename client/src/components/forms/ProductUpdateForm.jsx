import React from 'react'
import {Select} from 'antd'

const {Option} = Select

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  setValues
}) => {

  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand
  } = values
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" className="form-control" value={title} onChange={ handleChange}/>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input type="text" name="description" className="form-control" value={description} onChange={ handleChange}/>
      </div>
      <div className="form-group">
        <label>Price</label>
        <input type="number" name="price" className="form-control" value={price} onChange={ handleChange}/>
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          value={shipping === "Yes" ? "Yes" : "No"}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input type="number" name="quantity" className="form-control" value={quantity} onChange={ handleChange}/>
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          name="color"
          className="form-control"
          onChange={handleChange}
          value={color}
        >
          {colors.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brands</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleChange}
          value={brand}
        >
          {brands.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <br/>
      <button className="btn btn-outline-info">SAVE</button>
    </form>
  )
}

export default ProductUpdateForm
