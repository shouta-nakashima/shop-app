import React from 'react'

const FileUpload = () => {

  const fileUploadAndResize = (e) => {
    //console.log(e.target.files);
    //resize
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
