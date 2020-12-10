import React from 'react'

const LocalSearch = ({ keyword, setKeyword }) => {
  //search step3
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  return (
    // search step2
    <div>
      <input
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control p-1 mb-2"
      />
    </div>
  )
}

export default LocalSearch
