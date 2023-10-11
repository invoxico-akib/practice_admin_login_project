import { AiOutlineDelete } from "react-icons/ai"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

const DeleteSubAdmin = ({ id, refetch }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete = async () => {
        try {
            const responce = await axios.delete(`http://localhost:5000/subadmin/${id}`)
            const result = responce.status
            if (result == 200) {
                toast.success("You have deleted one record successfully")
                refetch()
                handleClose()
            } else {
                toast.error("Something went wrong")

            }

        } catch (error) {

        }

    }



    return (
        <>
            <AiOutlineDelete onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Sub Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )




}


export default DeleteSubAdmin