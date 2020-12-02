import axios from 'axios'

//dbにcartを追加
export const userCart = async (cart, authtoken) => 
  await axios.post(`${ process.env.REACT_APP_API }/user/cart`, { cart }, {
    headers: {
      authtoken,
    },
  })

//cartの情報を取得
export const getUserCart = async (authtoken) => 
  await axios.get(`${ process.env.REACT_APP_API }/user/cart`, {
    headers: {
      authtoken,
    },
  })

// cartを削除
export const emptyUserCart = async (authtoken) => 
  await axios.delete(`${ process.env.REACT_APP_API }/user/cart`, {
    headers: {
      authtoken,
    },
  })

export const saveUserAddress = async (authtoken, address) => 
  await axios.post(`${ process.env.REACT_APP_API }/user/address`, { address }, {
    headers: {
      authtoken,
    },
  })