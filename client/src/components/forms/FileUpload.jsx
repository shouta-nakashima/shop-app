import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'

const FileUpload = () => {

  const {user} = useSelector((state) => ({...state}))
  const fileUploadAndResize = (e) => {
    //console.log(e.target.files);
    //file resize
    let files = e.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (url) => {
          console.log(url);
        },
          "base64"
        )
      }
    }
    //cloudinaryにアップロードするためにサーバーに送り返す
    //ProductCreateのimages []にURLを設定する
  }

  return (
    <div className="row">
      <label className="btn btn-primary">
        ファイルを選択
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  )
}

export default FileUpload
