import React from 'react'
import {Radio} from 'antd'

const ColorSearch = ({colors, color, handleColor}) => {
  return (
    <div>
      {colors.map((c) =>
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-1 pr-4"
      >
        {c}
      </Radio>
    )}
    </div>
  )
}

export default ColorSearch
