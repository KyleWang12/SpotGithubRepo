import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateEntry(props) {

    const entry = props.entry;

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [detail, setDetail] = useState('');
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setName(entry ? entry.name : '');
        setAbout(entry ? entry.about : '');
        setDetail(entry ? entry.detail : '');
        setLink(entry ? entry.link : '');
    }, [props.show])

    const { userName } = props;

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!name || !about || !link) {
            return;
        }
        if (props.title === 'Create') {
            Axios.post('/api/entry',
                {
                    name,
                    about,
                    detail,
                    link,
                    userName,
                }).then(res => {
                    props.handleClose();
                    navigate('/');
                }).catch(e => {
                    console.log(e);
                })
        } else {
            Axios.put('/api/entry/' + entry._id, {
                name,
                about,
                detail,
                link,
                userName,
            })
                .then(res => {
                    props.updateEntry(res.data);
                    props.handleClose();
                })
                .catch(e => console.log(e))
        }

    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button> */}

            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title} a Repo Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Repository Name:</Form.Label>
                            <Form.Control type="text" onChange={(e) => setName(e.target.value)} defaultValue={name} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>About:</Form.Label>
                            <Form.Control as="textarea" rows={1} onChange={(e) => setAbout(e.target.value)} defaultValue={about} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Details of the Repositry (Optional):</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setDetail(e.target.value)} defaultValue={detail} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Link to Repository:</Form.Label>
                            <Form.Control type="text" onChange={(e) => setLink(e.target.value)} defaultValue={link} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button centered variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
