import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        Axios.post('/api/user/login',
            {
                userName: userName,
                password: password,
            }).then(res => {
                props.handleClose();
                navigate(0);
            }).catch(error => {
                setIsValid('is-invalid');
                console.log(error.response.data);
            })
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>User Name:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="text" className={isValid} onChange={(e) => setUserName(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Invalid username or password.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" className={isValid} onChange={(e) => setPassword(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Invalid username or password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button centered variant="primary" onClick={handleSubmit}>Log In</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
