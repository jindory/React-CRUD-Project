import React, { useState } from 'react'

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

    const handleButtonClick = () => {
        
        // const updData = data.filter(data => data.id === crInd);
        const msgCard = {
            id:Number(id),
            username: 'guest',
            title: title,
            content:msg,
            createdAt: new Date().toLocaleDateString('ko-kr'),
        }
        
        const reverseData = intdata.reverse();
        reverseData[crInd-1] = msgCard; //수정객체 챡 넣기
        setNewIntData(reverseData.reverse());

        // console.log('기존객체',...intdata);
        msgUpdata();
        setData([...newIntData]);
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
          <div>
            <button onClick={handleButtonCancleClick}>취소</button>
            <button value={crInd} onClick={handleButtonClick}>수정완료</button>
            {/* <button onClick={onUpdate}>수정완료</button> */}
          </div>
        </div>
      )
  }


export default Update