import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { getSubs, createSub, deleteSub } from '../../../functions/sub'
import { getCategories } from '../../../functions/category'
import {CategoryForm, LocalSearch} from '../../../components/forms/index'

const SubCreate = () => {

  const { user } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [subs, setSubs] = useState([])
  //search step1
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories()
    loadSus()
  }, [])
  
  const loadCategories = () =>
    getCategories()
      .then((s) => { setCategories(s.data) })

  const loadSus = () =>
    getSubs()
      .then((c) => { setSubs(c.data) })

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(name);
    setLoading(true)
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`サブカテゴリーに"${ res.data.name }"を作成しました。`)
        loadSus()
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
      deleteSub(slug, user.token)
        .then(res => {
          setLoading(false)
          toast.error(`サブカテゴリー"${ res.data.name }"を削除しました。`)
          loadSus()
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
  const searched = (keyword) => (sub) => sub.name.toLowerCase().includes(keyword)

  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h4>Create sub category</h4>}

          <div className="form-group">
            <label>Category Name</label>
            <select
              name="ategory"
              className="form-control"
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.length > 0 && categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            text={"Create Sub Category"}
          />
          <LocalSearch
            setKeyword={setKeyword}
            keyword={keyword}
          />
          {/* search step5 */}
          {subs.filter(searched(keyword)).map((sub) => (
            <div className="alert alert-secondary" key={sub._id}>
              { sub.name}
              <span onClick={() => handleDelete(sub.slug)} className="btn btn-sm float-right">
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${ sub.slug }`}>
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

export default SubCreate