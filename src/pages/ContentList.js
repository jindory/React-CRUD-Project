import React from 'react'

function ContentList({msgList, clickCardHandler}) {
  if (msgList.length === 0) {
    return <div className="merge-col">목록이 없습니다</div>;
  }

  return (
      <div className="lst-card row" id={msgList.id} onClick={clickCardHandler}>
        <div>
          {/* data의 번호 */}
          <span className="lst-num">{msgList.id}</span>
          {/* data의 제목 */}
          <span className="lst-subject">{msgList.title}</span>
        </div>
        {/* data의 작성일자 */}
        <div className="lst-data">{new Date(msgList.createdAt).toLocaleDateString('ko-kr')}</div>
      </div>
    )
}

export default ContentList