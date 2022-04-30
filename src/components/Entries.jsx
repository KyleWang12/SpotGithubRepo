import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import timeSince from '../helper/timeSince';
import { stringAvatar } from '../helper/stringToColor';
import './display.css';

export default function Entries(props) {

    const [entries, setEntries] = useState([]);

    function getEntries() {
        Axios.get('/api/entry')
            .then(res => setEntries(res.data))
    }

    useEffect(getEntries, []);

    const entriesComponent = [];
    for (let entry of entries) {
        if (entry.name) {
            entriesComponent.push(
                <Card key={entry._id} className="m-2">
                    <Card.Body className="m-0 pt-1 pb-2">
                        <Card.Title className="mt-2 mb-0">
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to={"/repos/" + entry._id} className='text-decoration-none'>
                                    <h2>{entry.name}</h2>
                                </Link>
                            </div>
                        </Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">{entry.topics}</Card.Subtitle> */}
                        <Card.Text className="m-0">{entry.about}</Card.Text>
                        <Card.Text className="m-0 text-muted font-small">
                            {/* {'by ' + entry.userName}
                            {' | '} */}
                            {'Created ' + timeSince(entry.createdDate)}
                            {' | '}
                            {'Last modified ' + timeSince(entry.lastModified)}
                        </Card.Text>
                        <div className='d-flex align-items-center mt-1'>
                            {entry.reviewCount === 0 ? '' :
                                <AvatarGroup total={entry.reviewCount} sx={{
                                    '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                                }} className='me-1'>
                                    {entry.reviews.map(name => {
                                        return (
                                            <Avatar key={uuidv4()} {...stringAvatar(name)} />
                                        )
                                    })}
                                </AvatarGroup>
                            }
                            {entry.reviewCount + ' '} Reviews
                        </div>
                        {/* <Card.Link className="m-0" href="#">
                            <GitHubIcon className='dark'/>
                        </Card.Link> */}
                    </Card.Body>
                </Card>
            )
        }
    }

    return (
        <Container>
            {entriesComponent}
        </Container>
    )
}