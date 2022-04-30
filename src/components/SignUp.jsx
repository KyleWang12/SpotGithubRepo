import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nameIsValid, setNameIsValid] = useState('');
    const [PwdisValid, setPwdIsValid] = useState('');
    const [PwdisMatch, setPwdIsMatch] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (password !== password2) {
            setPwdIsMatch('is-invalid');
            return;
        }
        if (!password || !userName) {
            setNameIsValid('is-invalid');
            setPwdIsValid('is-invalid');
            return;
        }
        Axios.post('/api/user/',
            {
                userName: userName,
                password: password,
            }).then(res => {
                props.handleClose();
                navigate(0);
            }).catch(error => {
                setNameIsValid('is-invalid');
                console.log(error.response);
            })
    }

    function checkPwdMatch(pwd) {
        setPassword2(pwd);
        setPwdIsMatch('');
    }

    function checkPwd(pwd) {
        setPassword(pwd);
        setPwdIsValid('');
    }
    function checkName(name) {
        setUserName(name);
        setNameIsValid('');
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
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>User Name:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="text" className={nameIsValid} onChange={(e) => checkName(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    User Name invalid or already exists!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" className={PwdisValid} onChange={(e) => checkPwd(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Invalid password!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Re-enter Password:</Form.Label>
                            <Form.Control type="password" className={PwdisMatch} onChange={(e) => checkPwdMatch(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Password Not Match!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button centered variant="primary" onClick={handleSubmit}>Sign Up</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
