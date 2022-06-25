import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Update({id, intdata, data, setMode, setData, msgUpdata}){
    const [title, setTitle] = useState(data[0].title);
    const [msg, setMsg] = useState(data[0].content);
    const [newIntData, setNewIntData] = useState(...intdata);

    let crInd = Number(id);
    function changeSubject(event){
        setTitle(event.target.value);
    }

    function changeContent(event){
        setMsg(event.target.value);
    }
    

    const handleButtonClick = (event) => {
        const filterId = event.target.value;
        const newData = {
            username:'gest',
            title:title,
            content: msg,
            createdAt: new Date().toLocaleString()
        };
        console.log(newData);
        return fetch(`http://localhost:3001/discussions/${filterId}`, { 
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then((res) => {
            if (res.status === 201) {
            }
        })
        
        // const msgCard = {
        //     id:Number(id),
        //     username: 'guest',
        //     title: title,
        //     content:msg,
        //     createdAt: new Date().toLocaleDateString('ko-kr'),
        // }
        
        // const reverseData = intdata.reverse();
        // reverseData[crInd-1] = msgCard; //수정객체 챡 넣기
        // setNewIntData(reverseData.reverse());

        // console.log('기존객체',...intdata);
        // setData([...newIntData]);
    }
    
    const handleButtonCancleClick = () => {
        setMode('READ');
    }

    return (
        <div className='CreateContent con-panal'>
          <input 
          className='ipt-form' 
          placeholder='제목 입력'
          value={title}
          onChange={changeSubject}
          ></input>
          <textarea 
          className='ipt-form' 
          placeholder='내용 입력'
          value={msg}
          onChange={changeContent}
          ></textarea>
          <div className="btn-group">
            <button className="btn-sm sub" onClick={handleButtonCancleClick}>취소</button>
            <button className="btn-sm" value={crInd} onClick={handleButtonClick}><FontAwesomeIcon icon={faCheck} /> 수정완료</button>
            {/* <button onClick={onUpdate}>수정완료</button> */}
          </div>
        </div>
      )
  }


export default Update