import { useRef } from "react";
import './style.css';
import { Modal, Button } from "react-bootstrap";

function ShowNewModal(props) {

    const titleInput = useRef(null);
    const descriptionInput = useRef(null);


    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered
        >
            <Modal.Header className="border border-0" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-inline-block pt-0">
                <form className="d-flex flex-column">
                    <label htmlFor="email">
                        Title</label>
                    <input ref={titleInput} defaultValue={props.notetitle} type="text" id='email' className='mt-2' />
                    <label htmlFor="password" className='mt-4 '>
                        Description</label>
                    <textarea rows={5} cols={10} defaultValue={props.notedesc} ref={descriptionInput} type="text" id='password' className='mt-2' />
                </form>
                <Button className="mt-4" onClick={() => props.btnclicked(titleInput.current.value, descriptionInput.current.value,)}>{props.btnname}</Button>
            </Modal.Body>
        </Modal>
    );
}

export default ShowNewModal;