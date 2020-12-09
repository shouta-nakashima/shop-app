import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {updateSub, getSub } from '../../../functions/sub'
import { getCategories } from '../../../functions/category'
import { CategoryForm } from '../../../components/forms/index'
import { Spin} from 'antd';

const SubUpdate = ({history,match}) => {

  const { user } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState('')
  
  useEffect(() => {
    loadCategories()
    loadSub()
  }, [])
  
  const loadCategories = () =>
    getCategories()
      .then((c) => { setCategories(c.data) })

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name)
      setParent(s.data.parent)
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(name);
    setLoading(true)
    updateSub(match.params.slug,{ name, parent }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`サブカテゴリー"${ res.data.name }"を更新しました。`)
        history.push('/admin/sub')
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
          <div className="col-md-8 offset-md-2">
            <h4 className="text-center pt-3 pb-3">Update sub category</h4>

            <div className="form-group">
              <label>Category Name</label>
              <select
                name="category"
                className="form-control"
                onChange={e => setParent(e.target.value)}
              >
                <option value="">Select a Category</option>
                {categories.length > 0 && categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    selected={category._id === parent}
                  >
                    {category.name}
                  </option>))}
              </select>
            </div>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              text={"Update Sub Category"}
              subName={"Sub Category Name"}
            />
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default SubUpdate