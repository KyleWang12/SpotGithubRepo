import React, { useState } from 'react'
import Axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateReview(props) {

    const [content, setContent] = useState('');
    const { review, reviewsCNT, updateReviews, userName, reviewChanged } = { ...props };


    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (props.title === 'Create') {
            Axios.post('/api/review',
                {
                    id: props.entryId,
                    content,
                    userName: userName,
                }).then(res => {
                    updateReviews(reviewsCNT + 1);
                    props.handleClose();
                }).catch(e => {
                    console.log(e);
                })
        } else {
            Axios.put('/api/review/' + props.entryId, {
                _id: review._id,
                content: content,
            })
                .then(res => {
                    updateReviews(reviewChanged + 1);
                    props.handleClose();

                })
        }

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
                    <Modal.Title>{props.title} a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Content:</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setContent(e.target.value)} defaultValue={review ? review.content : ''} />
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
