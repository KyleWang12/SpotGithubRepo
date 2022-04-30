import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap';
import { FiExternalLink } from 'react-icons/fi'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton } from '@mui/material';
import { stringAvatar } from '../helper/stringToColor';
import Divider from '@mui/material/Divider';
import CreateReview from './CreateReview';
import CreateEntry from './CreateEntry';

import 'bootstrap/dist/css/bootstrap.min.css';

// /repos/:repoId
export default function RepoEntry(props) {

    const params = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState(undefined);
    const [review, setReview] = useState({});

    const [showCreateReview, setShowCreateReview] = useState(false);
    const [showCreateEntry, setShowCreateEntry] = useState(false);
    const [showEditReview, setShowEditReview] = useState(false);

    const [reviewsCNT, setReivewsCNT] = useState(0);
    const [reviewChanged, setReviewChanged] = useState(1);
    const [editEntry, setEditEntry] = useState({});

    const { userName } = props;

    useEffect(() => {
        Axios.get('/api/entry/' + params.repoId)
            .then((res) => {
                setEntry(res.data);
                setReivewsCNT(res.data.reviews.length);
            })
    }, []);

    useEffect(() => {
        Axios.get('/api/entry/' + params.repoId)
            .then((res) => {
                setEntry(res.data);
            })
    }, [reviewsCNT]);

    useEffect(() => {
        Axios.get('/api/entry/' + params.repoId)
            .then((res) => {
                setEntry(res.data);
            })
    }, [reviewChanged])

    function deleteEntry() {
        Axios.delete('/api/entry/' + params.repoId)
            .then(res => {
                navigate('/repos/', { replace: true })
            })
    }

    function deleteReview(id) {
        Axios.delete('/api/review/' + params.repoId + '/' + id)
            .then(res => {
                setReivewsCNT(reviewsCNT - 1);
                // navigate('/repos/', {replace: true})
            })
    }


    if (!entry) {
        return;
    }

    return (
        <Container>
            <Card className="m-2">
                <Card.Body>
                    <Card.Title className='m-2 mb-4 d-flex justify-content-between align-items-center'>
                        <h2>{entry.name}</h2>
                        {entry.userName === userName ?
                            <div>
                                <IconButton onClick={() => {
                                    setEditEntry(entry);
                                    setShowCreateEntry(true);
                                }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={deleteEntry}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            :
                            ''
                        }
                    </Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">{entry.topics}</Card.Subtitle> */}
                    <Card.Text>
                        <div className='mb-2'><b>▌ About</b></div>
                        <div>
                            {entry.about}
                        </div>
                    </Card.Text>
                    {entry.detail ?
                        <Card.Text>
                            <div className='mb-2'><b>▌ Details</b></div>
                            <div>
                                {entry.detail}
                            </div>
                        </Card.Text>
                        :
                        ''
                    }
                    <Card.Link className='d-flex text-decoration-none align-items-center' href={entry.link}>
                        Github
                        <FiExternalLink />
                    </Card.Link>
                </Card.Body>
            </Card>
            <Container className='mt-5'>
                <Container className='d-flex justify-content-between mb-2'>
                    {entry.reviews.length > 0 ?
                        <h2>User Reviews</h2>
                        :
                        ''
                    }

                    {userName ?
                        <Button variant="outline-dark" onClick={() => {
                            setShowCreateReview(true);
                        }} >Add Review</Button>
                        :
                        ''
                    }
                </Container>

                {entry.reviews.map(review => {
                    return (
                        <Container key={review._id} className='m-1'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex flex-row align-items-center'>
                                    <Avatar {...stringAvatar(review.userName)} className='m-1' />
                                    <h6>{review.userName}</h6>
                                </div>
                                {review.userName === userName ?
                                    <div>
                                        <IconButton onClick={() => {
                                            setReview({ ...review });
                                            setShowEditReview(true);
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            deleteReview(review._id);
                                        }} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="fs-6 m-1">
                                {review.content}
                            </div>
                            <div className="fs-6 m-1 text-muted">
                                Created
                                {' '}
                                {(new Date(review.createdDate)).toLocaleString('default', { month: 'long' })}
                                {' '}
                                {(new Date(review.createdDate)).getDay() + ", "}
                                {(new Date(review.createdDate)).getFullYear()}
                                {' | '}
                                Last modified
                                {' '}
                                {(new Date(review.lastModified)).toLocaleString('default', { month: 'long' })}
                                {' '}
                                {(new Date(review.lastModified)).getDay() + ", "}
                                {(new Date(review.lastModified)).getFullYear()}
                            </div>
                            <Divider />
                        </Container>
                    )
                })}
            </Container>
            <CreateReview show={showCreateReview} handleClose={() => setShowCreateReview(false)} entryId={params.repoId} reviewsCNT={reviewsCNT} updateReviews={setReivewsCNT} userName={userName} title='Create' />
            <CreateReview show={showEditReview} handleClose={() => setShowEditReview(false)} entryId={params.repoId} review={review} reviewChanged={reviewChanged} updateReviews={setReviewChanged} userName={userName} title='Edit' />
            <CreateEntry show={showCreateEntry} handleClose={() => setShowCreateEntry(false)} userName={userName} title='Edit' entry={editEntry} updateEntry={setEntry} />
        </Container>
    )
}
