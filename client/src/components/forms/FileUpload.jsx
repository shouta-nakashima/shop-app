import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'


const FileUpload = ({values, setValues, setLoading}) => {

  const {user} = useSelector((state) => ({...state}))
  const fileUploadAndResize = (e) => {
    //console.log(e.target.files);
    //file resize
    let files = e.target.files
    let allUploadedFiles = values.images
    if (files) {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (url) => {
          // console.log(url);
          axios.post(
            `${ process.env.REACT_APP_API }/uploadimages`,
            { image: url },
            {
              headers: {
                authtoken: user ? user.token : ''
              }
            }
          )
            .then((res) => {
              console.log('IMAGE UPLOAD DATA', res);
              setLoading(false)
              allUploadedFiles.push(res.data)

              setValues({...values, allUploadedFiles})
            })
            .catch(err => {
              setLoading(false)
              console.log('UPLOAD ERROR', err);
            })
        },
          "base64"
        )
      }
    }
    //cloudinaryにアップロードするためにサーバーに送り返す
    //ProductCreateのimages []にURLを設定する
  }

  const handleImageDelete = (public_id) => {
    setLoading(true)
    console.log(public_id);
    axios.post(
      `${ process.env.REACT_APP_API }/removeimage`,
      { public_id},
      {
        headers: {
          authtoken: user ? user.token : ''
        }
      }
    )
    .then((res) => {
      setLoading(false)
      const { images } = values
      let filteredImages = images.filter((item) => {
        return item.public_id !== public_id
      })
      setValues({...values, images: filteredImages})
    })
      .catch(err => {
        setLoading(false)
        console.log((err));
    })
  }

  return (
    <>
      <div className="row">
        {values.images && values.images.map((image) => (
          <Badge
            count="X"
            key={image.public_id}
            onClick={() => handleImageDelete(image.public_id)}
            style={{cursor: "pointer"}}
          >
            <Avatar
              src={image.url}
              size={100}
              className="ml-3"
              shape="square"
            />
          </Badge>
        ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
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
    </>
  )
}

export default FileUpload
