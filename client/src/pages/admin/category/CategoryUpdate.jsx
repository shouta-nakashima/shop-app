import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'
import { Spin} from 'antd';

const CategoryUpdate = ({history, match}) => {

  const { user } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategory()
  }, [])
  
  const loadCategory = () =>
    getCategory(match.params.slug)
      .then((c) => { setName(c.data.name) })


  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(name);
    setLoading(true)
    updateCategory(match.params.slug,{ name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`カテゴリー"${ res.data.name }"を更新しました。`)
        history.push('/admin/category')
      })
      .catch(err => {
        setLoading(false)
        if (err.response.status === 400) toast.error(err.response.data);
      })
  }

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className ="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav/>
          </div>
          <div className="col">
            <h4 className="text-center pt-3 pb-3">Update category</h4>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              text={"Update category"}
              subName={"Category Name"}
            />
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default CategoryUpdate