import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { getCategories, createCategory, deleteCategory } from '../../../functions/category'
import { CategoryForm, LocalSearch } from '../../../components/forms/index'
import { Spin} from 'antd';

const CategoryCreate = () => {

  const { user } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  //search step1
  const [keyword, setKeyword] = useState('')

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

  //search step4
  const searched = (keyword) => (category) => category.name.toLowerCase().includes(keyword)

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className ="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav/>
          </div>
          <div className="col">
            <h4 className="text-center pt-3 pb-3">Create category</h4>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              text={"Create category"}
              subName={"Category Name"}
            />
            <LocalSearch
              setKeyword={setKeyword}
              keyword={keyword}
            />
            {/* search step5 */}
            {categories.filter(searched(keyword)).map((category) => (
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
      </Spin>
  )
}

export default CategoryCreate