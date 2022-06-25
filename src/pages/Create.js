import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Create.css'

function Create({onCreate, setMode, countIdF}) {

  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleChangeMsg = (event) => {
    return setMsg(event.target.value);
  };

  const handleButtonClick = () => {
    onCreate({ subject, msg })
    countIdF();
  }

  const handleButtonCancleClick = () => {
    setMode('WELCOME');
  }
  return (
    <div className='CreateContent table'>
      <span className="lb">SUBJECT</span>
      <input 
      className='ipt-form' 
      placeholder='제목 입력'
      onChange={handleChangeSubject}
      ></input>
      <span className="lb">CONTENT</span>
      <textarea 
      className='ipt-form' 
      placeholder='내용 입력'
      onChange={handleChangeMsg}
      ></textarea>
      <div className="btn-group">
        <button className="btn-sm sub" onClick={handleButtonCancleClick}>취소</button>
        <button className="btn-sm" onClick={handleButtonClick}><FontAwesomeIcon icon={faCheck} /> 저장</button>
      </div>
    </div>
  )
}

export default Create