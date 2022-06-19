import React, { useState } from 'react'
import './Create.css'

function Create({onCreate, setMode, countId, countIdF}) {
  console.log(countId);
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleChangeMsg = (event) => {
    return setMsg(event.target.value);
  };

  const handleButtonClick = () => {
    const msgCard = {
      id:countId,
      username: 'guest',
      title: subject,
      content:msg,
      createdAt: new Date().toLocaleDateString('ko-kr'),
    }
    countIdF();
    setMode('WELCOME');
    onCreate({msgCard}); //재배열
  }

  const handleButtonCancleClick = () => {
    setMode('WELCOME');
  }
  return (
    <div className='CreateContent table'>
      <span class="lb">SUBJECT</span>
      <input 
      className='ipt-form' 
      placeholder='제목 입력'
      onChange={handleChangeSubject}
      ></input>
      <span class="lb">CONTENT</span>
      <textarea 
      className='ipt-form' 
      placeholder='내용 입력'
      onChange={handleChangeMsg}
      ></textarea>
      <div class="btn-group">
        <button className="btn-sm sub" onClick={handleButtonCancleClick}>취소</button>
        <button className="btn-sm" onClick={handleButtonClick}>저장</button>
      </div>
    </div>
  )
}

export default Create