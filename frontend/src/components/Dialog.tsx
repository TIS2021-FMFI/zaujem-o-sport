import React,{useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Dialog() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick = {handleShow}>
        Potvrď zmeny
    </Button>

    <Modal
    show = { show }
    onHide = { handleClose }
    backdrop = "static"
    keyboard = { false }
        >
        <Modal.Header closeButton>
        <Modal.Title>Potvrdenie zmien</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    Chcete tieto zmeny skutočne uskutočniť?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Zruš
            </Button>
            <Button variant="primary" onClick={handleClose} >Potvrď</Button>
        </Modal.Footer>
        </Modal>
        </>
);
}

export default Dialog;
