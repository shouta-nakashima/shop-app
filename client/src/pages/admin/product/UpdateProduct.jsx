import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct } from '../../../functions/product'
import { ProductCreateForm } from '../../../components/forms/index'
import { getCategories, getCategorySubs } from '../../../functions/category'
import { FileUpload } from '../../../components/forms/index'
import { Spin } from 'antd';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ["Black", "Brown", "White", "Silver", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Dell"],
  color: '',
  brand: ''
}


const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => ({ ...state }))
  let {slug} = match.params

  useEffect(() => {
    loadProduct()
  },[])

  const loadProduct = () => {
    getProduct(slug)
      .then(p => {
        //console.log('single product', p);
        setValues({...values, ...p.data})
      })
  }
  
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav/>
          </div>
          <div className="col-md-10">
            <h4 className="text-center pt-3 pb-3">Product Update</h4>
            <hr />
            {JSON.stringify(values)}
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default UpdateProduct
