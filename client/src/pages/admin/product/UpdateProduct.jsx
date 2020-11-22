import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import { ProductCreateForm } from '../../../components/forms/index'
import { getCategories, getCategorySubs } from '../../../functions/category'
import { FileUpload } from '../../../components/forms/index'
import { Spin } from 'antd';


const UpdateProduct = ({match}) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => ({ ...state }))
  let {slug} = match.params
  
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
            {JSON.stringify(slug)}
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default UpdateProduct
