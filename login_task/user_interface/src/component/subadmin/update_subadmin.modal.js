import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import  Styles from "./update_subadmin.module.css"
import { AiOutlineEdit } from "react-icons/ai"

export const UpdateSubAdmin = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email_id, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const [error, setError] = useState(false)




    //

    const handleCreateSubAdmin = async () => {

        if (!first_name || !last_name || !email_id || !password || !status) {
            setError(true)

        } else {
            try {
                const responce = await axios.post("http://localhost:5000/create-subadmin", {
                    first_name,
                    last_name,
                    email_id,
                    password,
                    status
                })
                const result = responce.status
                // refetch()

                if (result === 200) {
                    toast.success("Congratulation ! Yor are registered successfully")
                    setFirstName("");
                    setLastName("")
                    setEmailId("")
                    setPassword("")
                    setStatus("")

                } else {
                    toast.error("Sorry ! Something went wrong")
                }


            } catch (error) {
                console.log("something went werong")
                toast.error("Sorry ! Something went wrong")

            }
        }
    }





    return (

        <>
                <AiOutlineEdit onClick={handleShow} style={{cursor:"pointer"}}/> 
                 <ToastContainer />
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update SubAdmin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={first_name}
                                onChange={((e) => setFirstName(e.target.value))}
                            />
                            {error && !first_name && <p style={{ color: "red" }}>please enter firstname</p>}

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={last_name}
                                onChange={((e) => setLastName(e.target.value))}
                            />
                            {error && !last_name && <p style={{ color: "red" }}>please enter lastname</p>}

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                value={email_id}
                                onChange={((e) => setEmailId(e.target.value))}
                            />
                            {error && !email_id && <p style={{ color: "red" }}>please enter EmailId</p>}

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                autoFocus
                                value={password}
                                onChange={((e) => setPassword(e.target.value))}
                            />
                            {error && !password && <p style={{ color: "red" }}>please enter Password</p>}

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Select size="sm" value={status} onChange={((e) => setStatus(e.target.value))}>
                                <option>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                            </Form.Select>
                            {error && !status && <p style={{ color: "red" }}>please enter Password</p>}

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateSubAdmin}>
                        Update SubAdmin
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )




}


