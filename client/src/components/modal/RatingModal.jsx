import React, {useState} from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import {StarOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <div onClick={() => setModalVisible(true)}>
        <StarOutlined className="text-danger"/> <br/> {user ? "評価する" : "ログインして評価する"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
          toast('評価していただきありがとうございます。')
        }}
        onCancel={() => setModalVisible(false)}
      >{children}</Modal>
    </>
  )
}

export default RatingModal
