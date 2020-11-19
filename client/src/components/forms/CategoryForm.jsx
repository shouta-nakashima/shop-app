import React from 'react'

const CategoryForm = ({handleSubmit, name, setName,text}) => (
  
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Category Name</label>
        <input
          type="text"
          className="form-control"
          onChange={e => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br/>
        <button className="btn btn-outline-primary">{text}</button>
      </div>
    </form>
)


export default CategoryForm
