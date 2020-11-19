import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { getCategories, createCategory, deleteCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryCreate = () => {

  const { user } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories()
  }, [])
  
  const loadCategories = () =>
    getCategories()
      .then((c) => { setCategories(c.data) })


  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(name);
    setLoading(true)
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`カテゴリーに"${ res.data.name }"を作成しました。`)
        loadCategories()
      })
      .catch(err => {
        setLoading(false)
        if (err.response.status === 400) toast.error(err.response.data);
      })
  }

  const handleDelete = (slug) => {
    //let answer = window.confirm('削除しますか？')
    if (window.confirm('本当に削除しますか？')) {
      setLoading(true)
      deleteCategory(slug, user.token)
        .then(res => {
          setLoading(false)
          toast.error(`カテゴリー"${ res.data.name }"を削除しました。`)
          loadCategories()
        })
        .catch(err => {
          if (err.response.status === 400) {
            setLoading(false)
            toast.error(err.response.data);
          }
        })
    }
  }

  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h4>Create category</h4>}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            text={"Create category"}
          />
          <hr />
          {categories.map((category) => (
            <div className="alert alert-secondary" key={category._id}>
              { category.name}
              <span onClick={() => handleDelete(category.slug)} className="btn btn-sm float-right">
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${ category.slug }`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ) )}
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate