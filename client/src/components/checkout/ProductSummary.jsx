import React from 'react'

const ProductSummary = ({products, total, totalAfterdiscount,}) => {
  return (
    <>
      <h4 className="text-danger text-center">ご注文内容の確認</h4>
      <hr />
      <p>現在{ products.length}つの商品が入っています</p>
      <hr />
      {products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) x {p.count} = {(p.product.price * p.count).toLocaleString()}円
          </p>
        </div>
      ))
      }
      <hr />
      <p>カートの合計：{ total.toLocaleString()}円</p>
      {totalAfterdiscount > 0 && 
        <p className="text-success ">
          クーポン適用後の合計：{(totalAfterdiscount * 1).toLocaleString()}円
        </p>
      }
    </>
  )
}

export default ProductSummary
