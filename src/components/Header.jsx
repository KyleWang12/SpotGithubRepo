import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import CreateEntry from './CreateEntry';
import { stringAvatar } from '../helper/stringToColor';
import Login from './Login';
import SignUp from './SignUp';


export default function Header(props) {

    const location = useLocation();
    const [showCreateEntry, setShowCreateEntry] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const { userName, logout } = props;

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link >
                        <Link to="/repos" className='text-decoration-none text-reset'>
                            Home
                        </Link>
                    </Nav.Link>
                    {userName && (location.pathname === '/repos' || location.pathname === '/repos/') ?
                        <NavDropdown title="Create">
                            <NavDropdown.Item onClick={() => setShowCreateEntry(true)}>Repository Entry</NavDropdown.Item>
                        </NavDropdown>
                        : ''
                    }
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    {userName ?
                        <Nav>

                            <NavDropdown title={'@' + userName} align="end">
                                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                            <Avatar {...stringAvatar(userName)} />
                        </Nav>
                        :
                        <>
                            <Button variant="outline-light" className='m-1' onClick={() => setShowLogin(true)}>Log In</Button>
                            {' '}
                            <Button variant="outline-light" className='m-1' onClick={() => setShowSignUp(true)}>Sign Up</Button>
                        </>
                    }
                </Navbar.Collapse>
                <CreateEntry show={showCreateEntry} handleClose={() => setShowCreateEntry(false)} userName={userName} title='Create' />
                <Login show={showLogin} handleClose={() => setShowLogin(false)} />
                <SignUp show={showSignUp} handleClose={() => setShowSignUp(false)} />
            </Container>
        </Navbar>
    )
}
