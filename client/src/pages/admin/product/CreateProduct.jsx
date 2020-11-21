import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import { ProductCreateForm } from '../../../components/forms/index'
import {getCategories, getCategorySubs} from '../../../functions/category'

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

const CreateProduct = () => {
  const [values, setValues] = useState(initialState)
  const [subOptions, setSubOptions] = useState([])
  const [showSubs, setShowSubs] = useState(false)
  const { user } = useSelector((state) => ({ ...state }))
  
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories()
      .then((c) => { setValues({...values, categories: c.data}) })

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${ res.data.title }を作成しました。`)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    //console.log(e.target.name, '----', e.target.value);
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    console.log('CLICK CATEGORY', e.target.value);
    setValues({ ...values, category: e.target.value })
    getCategorySubs(e.target.value)
      .then((res) => {
        console.log('SUBs',res);
        setSubOptions(res.data)
      })
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          <hr />
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSubs={showSubs}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
