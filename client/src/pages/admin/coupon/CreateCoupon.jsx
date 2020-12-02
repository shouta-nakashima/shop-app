import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, deleteCoupon, createCoupon } from '../../../functions/coupon'
import { DeleteOutlined } from '@ant-design/icons'
import { Spin} from 'antd';
import AdminNav from '../../../components/nav/AdminNav'
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col">
        <h4 className="text-center pt-3 pb-3">Create Coupon</h4>
        </div>
      </div>
      </div>
  )
}

export default CreateCoupon
