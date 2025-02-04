import React, { useEffect, useState } from 'react'
import Create from './pages/Create'
import ContentList from './pages/ContentList'
import PrintContent from './pages/PrintContent'
import Update from './pages/Update'
import dummyDates from './resource/dummyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faGear, faTrash } from '@fortawesome/free-solid-svg-icons';

import './App.css'

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [data, setData] = useState([dummyDates]);
  const [conId, setConId] = useState();
  const [idxNum, setIdxNum] = useState([]);
  const [conSubject, setConSubject] = useState(data[0].title);
  const [conDate, setConDate] = useState(data[0].createdAt);
  const [conMsg, setConMsg] = useState(data[0].content);
  const [prevId, setPrevId] = useState('');

  useEffect(() => {
    getDis();
  },[])

  const getDis = (()=>{
    return fetch(`http://localhost:3001/discussions/`)
    .then((data)=> data.json())
    .then((data)=> {setData(data)});
  })

  const delDis = ((event)=>{
    setMode('WELCOME');
    const filterId = event.target.value;
    return fetch(`http://localhost:3001/discussions/${filterId}`, {
      method: 'DELETE',
    })
    .then((res) => {
      getDis()
    })
  })

  const addDis = (({ countId, subject, msg })=>{
    const newData = {
      id:countId,
      username:'gest',
      title:subject,
      content: msg,
      createdAt: new Date().toLocaleString()
    };
    console.log(newData);
    return fetch(`http://localhost:3001/discussions/`, { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
    .then((res) => {
      getDis();
      setMode('WELCOME');
    })
  })
  
  const countId = idxNum;
  function countIdF (){
    setIdxNum(countId=> countId+1)
  }

  // 목록 챠르륵
  const msgDataList = data.map(data => {
    return(
      <ContentList msgList={data} key={data.id} clickCardHandler={msgPrint}/>
    )
  })

  // 내용보기 - 최근 
  function LatestContent(){
    return(
      <div className='pg-detail con-panal'>
          <div>
          <span className="pd-date">{new Date(data[0].createdAt).toLocaleDateString('ko-kr')}</span>
          <h3>{data[0].title}</h3>
          </div>
          <div className="pg-con">{data[0].content}</div>
          <div className="btn-group">
              <button className="btn-sm sub" value={data[0].id} onClick={handleEdt}><FontAwesomeIcon icon={faGear} className="sub-i" /> 수정</button>
              <button className="btn-sm sub" value={data[0].id} onClick={delDis}><FontAwesomeIcon icon={faTrash} className="sub-i" /> 삭제</button>
          </div>
      </div>
    )
  }
  
  // 내용보기 - 선택
  function msgPrint(event) {
    const filterId = event.target.id;
    const sltData = data.filter(data => {return(data.id === Number(filterId))});
    setConId (sltData[0].id);
    setConSubject (sltData[0].title);
    setConDate (new Date(sltData[0].createdAt).toLocaleDateString('ko-kr'));
    setConMsg (sltData[0].content);
    console.log('읽기', sltData);
    setMode('READ');
  };

  // 내용보기 - 업데이트한 내용
  function msgUpdata(crInd) {
    // console.log(crInd.crInd);
    return fetch(`http://localhost:3001/discussions/${crInd.crInd}`)
    .then((data)=> data.json())
    .then((data)=> {
      setConId(data.id);
      setConSubject(data.title);
      setConMsg(data.content);
      getDis();
      setMode('READ');
    });
    
  }

 

  // 리스트 렌더 - 수정
  const edtData = data.filter(data => {return(data.id === Number(prevId))});
  function handleEdt(event){
    let numbSetPrevId = Number(event.target.value);
    setPrevId(numbSetPrevId);
    console.log(numbSetPrevId);
    setMode('UPDATE');
  }

  
  function setDataF(props){
    setData(props);
  }

  function handleSetMode(props){
    setMode(props);
  }

  function entryHandleBtn(){
    setMode('CREATE');
  }

  let content = null;
  if(mode === 'WELCOME'){
    content = <LatestContent />;
  } else if (mode === 'READ'){
    content = <PrintContent id={conId} title={conSubject} body={conMsg} date={conDate} handleEdit={handleEdt} handleDelete={delDis}/>;
  } else if (mode === 'CREATE'){
    content = <Create onCreate={addDis} setMode={handleSetMode} data={data} countId={countId} countIdF={countIdF}/>
  } else if (mode === 'UPDATE'){
    content = <Update id={prevId} upData={getDis} setData={setDataF} intdata={data} data={edtData} setMode={handleSetMode} msgUpdata={msgUpdata}/>
  }

  return (
    <div className='container'>
      <div className="table con-panal">
        <div className='table-title'>
          <span>CRUD History</span>
          <button onClick={entryHandleBtn}><FontAwesomeIcon icon={faCirclePlus}/> 글쓰기</button>
        </div>
        {msgDataList}
      </div>
      {content}
    </div>
  )
}

export default App