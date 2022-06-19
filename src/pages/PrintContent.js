import React from 'react'

function PrintContent({id, title, body, date, handleEdit, handleDelete}) {
    return(
        <div className='con-panal pg-detail'>
            <div>
                <span className="pd-date">{date}</span>
                <h3>{title}</h3>
            </div>
            <div>{body}</div>
            <div className="btn-group">
                <button className="btn-sm sub" value={id} onClick={handleEdit}>수정</button>
                <button className="btn-sm sub" value={id} onClick={handleDelete}>삭제</button>
            </div>
        </div>
    )
}

export default PrintContent