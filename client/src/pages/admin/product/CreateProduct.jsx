import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {createProduct} from '../../../functions/product'


const CreateProduct = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col-md-10">Product create form</div>
      </div>
    </div>
  )
}

export default CreateProduct
