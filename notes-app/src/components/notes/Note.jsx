import React from 'react'
import { Form } from 'react-bootstrap';
import './style.css'

const Note = ({ _id, title, description, isHidden, createdAt, openModal, bgColor, oncheckBoxclicked }) => {

    const createdDate = new Date(createdAt);
    return (
        <div className={`d-flex w-100 justify-content-between note-item flex-column p-3 rounded-4 ${bgColor}`} >
            <div onClick={() => openModal(_id, title, description)}>
                <h2 className='text-capitalize text-truncate'>{title}</h2>
                <p className='fw-light text-wrap note-subtitle'>{description}</p>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
                <h5 className='font-12 flex-shrink-0 m-0'>{createdDate.toLocaleString()}</h5>
                <Form.Check // prettier-ignore
                    type={'checkbox'}
                    onClick={() => oncheckBoxclicked(_id)}
                    role={'pointer'}
                    id={`default-checkbox`}
                />
            </div>
        </div>
    )
}

export default Note