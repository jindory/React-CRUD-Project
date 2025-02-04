import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faGear } from '@fortawesome/free-solid-svg-icons';

function PrintContent({id, title, body, date, handleEdit, handleDelete}) {
    date = new Date().toISOString();
    date = date.slice(0, 10);
    return(
        <div className='con-panal pg-detail'>
            <div>
                <span className="pd-date">{date}</span>
                <h3>{title}</h3>
            </div>
            <div className="pg-con">{body}</div>
            <div className="btn-group">
                <button className="btn-sm sub" value={id} onClick={handleEdit}><FontAwesomeIcon icon={faGear} className="sub-i" /> 수정</button>
                <button className="btn-sm sub" value={id} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} className="sub-i" /> 삭제</button>
            </div>
        </div>
    )
}

export default PrintContent