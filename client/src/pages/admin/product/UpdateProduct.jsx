import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../../functions/product'
import { getCategories, getCategorySubs } from '../../../functions/category'
import { FileUpload } from '../../../components/forms/index'
import { Spin } from 'antd';
import {ProductUpdateForm} from '../../../components/forms/index'

const initialState = {
  title: '',
  description: '',
  price: '',
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


const UpdateProduct = ({ match, history}) => {
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subOptions, setSubOptions] = useState([])
  const [arrayOfSubIds, setArrayOfSubIds] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const { user } = useSelector((state) => ({ ...state }))
  let {slug} = match.params

  useEffect(() => {
    loadProduct()
    loadCategories()
  },[])

  const loadProduct = () => {
    getProduct(slug)
      .then(p => {
        //console.log('single product', p);
        setValues({ ...values, ...p.data })
        getCategorySubs(p.data.category._id)
          .then((res) => {
          setSubOptions(res.data)
          })
        let arr = []
        p.data.subs.map((s) => {
          arr.push(s._id)
        })
        //console.log('SUBS Arr', arr);
        setArrayOfSubIds((prev) => arr)
      })
  }

  const loadCategories = () =>
    getCategories()
      .then((c) => {
        //console.log('Get Categories', c.data);
        setCategories(c.data)
      })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    values.subs = arrayOfSubIds
    values.category = selectedCategory ? selectedCategory : values.category

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false)
        toast.info(`${ res.data.title }を更新しました！！`)
        history.push('/admin/products')
      })
      .catch((err) => {
        //console.log(err);
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    //console.log(e.target.name, '----', e.target.value);
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    //console.log('CLICK CATEGORY', e.target.value);
    setValues({ ...values, subs: [] })
    
    setSelectedCategory(e.target.value)

    getCategorySubs(e.target.value)
      .then((res) => {
        //console.log('SUBs',res);
        setSubOptions(res.data)
      })
    if (values.category._id === e.target.value) {
      loadProduct()
    }
    setArrayOfSubIds([])
  }
  
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid" style={{paddingTop: "70px", minHeight: "575px"}}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h4 className="text-center pt-3 pb-3">Product Update</h4>
            <hr />
            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
              {/* {JSON.stringify(values.images)} */}
            </div>
            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              subOptions={subOptions}
              arrayOfSubIds={arrayOfSubIds}
              setArrayOfSubIds={setArrayOfSubIds}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default UpdateProduct
