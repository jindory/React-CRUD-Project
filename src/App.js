import React, { useState } from 'react'
import Create from './pages/Create'
import ContentList from './pages/ContentList'
import PrintContent from './pages/PrintContent'
import Update from './pages/Update'
import dummyDates from './resource/dummyData';
import './App.css'

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [data, setData] = useState(dummyDates);
  const [conId, setConId] = useState();
  const [idxNum, setIdxNum] = useState(data.length+1);
  const [conSubject, setConSubject] = useState(data[0].title);
  const [conDate, setConDate] = useState(data[0].createdAt);
  const [conMsg, setConMsg] = useState(data[0].content);
  const [prevId, setPrevId] = useState('');
  
  const countId = idxNum;
  function countIdF (){
    setIdxNum(countId=> countId+1)
  }

  const msgDataList = data.map(data => {
    return(
      <ContentList msgList={data} key={data.id} clickCardHandler={msgPrint}/>
    )
  })

  const msgCard = ({msgCard}) => {
    const newData = [msgCard, ...data];
    console.log(newData);
    setData(newData); //뭔가 이쯤에서 뭔일이 있어나는듯 -ㅅ-;;; 담아오는 거 다시 확인해보기..
  }

  // 내용보기 - 최근 
  function LatestContent(){
    return(
      <div className='pg-detail con-panal'>
          <div>
          <span className="pd-date">{new Date(data[0].createdAt).toLocaleDateString('ko-kr')}</span>
          <h3>{data[0].title}</h3>
          </div>
          <div>{data[0].content}</div>
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
  }

  // 내용보기 - 업데이트한 내용
  function msgUpdata() {
    const updData = data.filter(data => {return(data.id === Number(prevId))});
    setConId (updData[0].id);
    setConSubject (updData[0].title);
    setConDate (new Date(updData[0].createdAt).toLocaleDateString('ko-kr'));
    setConMsg (updData[0].content);
    console.log('담기담기', updData);
    setMode('READ');
  }

  // 리스트 렌더 - 삭제
  function handleDlt(event){
    const filterId = event.target.value;
    const delData = data.filter(data => {return(data.id !== Number(filterId))});
    const newData = [...delData];
    setData(newData);
    setMode('WELCOME');
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

  function entryHandleBtn(){
    setMode('CREATE');
  }

  function handleSetMode(props){
    setMode(props);
  }


  let content = null;
  if(mode === 'WELCOME'){
    content = <LatestContent />;
  } else if (mode === 'READ'){
    content = <PrintContent id={conId} title={conSubject} body={conMsg} date={conDate} handleEdit={handleEdt} handleDelete={handleDlt}/>;
  } else if (mode === 'CREATE'){
    content = <Create onCreate={msgCard} setMode={handleSetMode} data={data} countId={countId} countIdF={countIdF}/>
  } else if (mode === 'UPDATE'){
    content = <Update id={prevId} setData={setDataF} intdata={data} data={edtData} setMode={handleSetMode} msgUpdata={msgUpdata}/>
  }

  return (
    <div className='container'>
      <div className="table con-panal">
        <div className='table-title'>
          <span>CRUD History</span>
          <button onClick={entryHandleBtn}>글쓰기</button>
        </div>
        {msgDataList}
      </div>
      {content}
    </div>
  )
}

export default App