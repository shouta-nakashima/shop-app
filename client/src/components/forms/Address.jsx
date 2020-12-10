import React, { useState } from 'react'
import { Input } from 'antd'



const Address = ({saveAddressToDb, address, setAddress, setSubAddress}) => {
  const [valAddress, setValAddress] = useState(true)

  const handleChange = e => {
    const params = address;
    params[e.target.name] = e.target.value;
    setAddress({ address: params });
  };

  const handleChangeVal = e => {
    const params = address;
    params[e.target.name] = e.target.value;
    setAddress({ address: params });
    setValAddress(false)
  };

  const handleChangeAddress = (e) => {
    const params = address;
    params[e.target.name] = e.target.value;
    setSubAddress(e.target.value)
  }

  const complementAddress = () => {
    const { AjaxZip3 } = window;
    AjaxZip3.zip2addr(
      'postCodeH',
      'postCodeF',
      'address1',
      'address2',
      'address3'
    );
  };

  const onBlurZipcode = () => {
    setAddress({
        postCodeH: document.getElementById('postCodeH').value,
        postCodeF: document.getElementById('postCodeF').value,
        address1: document.getElementById('address1').value,
        address2: document.getElementById('address2').value,
        address3: document.getElementById('address3').value,
    })
  };

  return (
    <div className="col text-center">
      <div className="col pb-3 text-center">

        <p>郵便番号を入力</p>
        〒
        <input
          name="postCodeH"
          id="postCodeH"
          size="3"
          maxLength="3"
          onChange={e => handleChange(e)}
          required
        />
        -
        <input
          name="postCodeF"
          size="4"
          maxLength="4"
          id="postCodeF"
          onChange={e => handleChangeVal(e)}
          onKeyUp={complementAddress}
          onBlur={onBlurZipcode}
        />
      </div>
      <div className="col">

        <input
          className="form-control"
          name="address1"
          id="address1"
          onChange={e => handleChange(e)}
          disabled
        />
        <input
          className="form-control"
          name="address2"
          id="address2"
          onChange={e => handleChange(e)}
          disabled
        />
        <input
          className="form-control"
          name="address3"
          id="address3"
          onChange={e => handleChange(e)}
          disabled
        />
        <Input
          className="form-control mt-3"
          name="streetAddress"
          id="streetAddress"
          onChange={e => handleChangeAddress(e)}
          placeholder="番地以下を入力"
        />
      </div>
      <button
        className="btn btn-primary mt-2 text-center btn-raised"
        onClick={saveAddressToDb}
        disabled={valAddress}
        
      >
        住所を登録
      </button>
    </div>
      
  )
}

export default Address
