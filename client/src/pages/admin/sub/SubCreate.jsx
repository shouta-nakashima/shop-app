import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { getSubs, createSub, deleteSub } from '../../../functions/sub'
import { getCategories } from '../../../functions/category'
import { CategoryForm, LocalSearch } from '../../../components/forms/index'
import { Spin} from 'antd';

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
    loadSubs()
  }, [])
  
  const loadCategories = () =>
    getCategories()
      .then((c) => { setCategories(c.data) })

  const loadSubs = () =>
    getSubs()
      .then((s) => { setSubs(s.data) })

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(name);
    setLoading(true)
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`サブカテゴリーに"${ res.data.name }"を作成しました。`)
        loadSubs()
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
          loadSubs()
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
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className ="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav/>
          </div>
          <div className="col">
            <h4 className="text-center pt-3 pb-3">Create sub category</h4>

            <div className="form-group">
              <label>Category Name</label>
              <select
                name="category"
                className="form-control"
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">選択してください</option>
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
              subName={"Sub Category Name"}
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
    </Spin>
  )
}

export default SubCreate