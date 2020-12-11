import React from 'react'

const SubsSearch = ({subs, handleSubs}) => {
  return (
    <div>
      {subs.map((s) =>
      <div
        key={s._id}
        onClick={() => handleSubs(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{cursor: "pointer"}}
      >
        {s.name}
      </div>)
      }
    </div>
  )
}

export default SubsSearch
