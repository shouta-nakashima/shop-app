import React from 'react'

const LocalSearch = ({ keyword, setKeyword }) => {
  //search step3
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  return (
    // search step2
      <input
        type="search"
        placeholder="カテゴリーを検索" 
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
  )
}

export default LocalSearch
