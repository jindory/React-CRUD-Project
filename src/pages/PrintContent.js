import React from 'react'

function PrintContent({id, title, body, date, handleEdit, handleDelete}) {
    return(
        <div className='con-panal'>
            <div>
                <h3>{title}</h3>
                <span>{date}</span>
            </div>
            <div>{body}</div>
            <div>
                <button value={id} onClick={handleEdit}>수정</button>
                <button value={id} onClick={handleDelete}>삭제</button>
            </div>
        </div>
    )
}

export default PrintContent