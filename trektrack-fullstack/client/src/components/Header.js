import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../Managers/UserProfileManager";
import { Container, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const user = JSON.parse(localStorage.getItem("userProfile"));

    return (
        
            <Navbar expand="md" bg="dark" variant="dark">
                <Navbar.Brand as={RRNavLink} to="/">
                    Trek Track
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggle} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {isLoggedIn && (
                            <>
                                <Nav.Link as={RRNavLink} to="/" className="rounded-3">Home</Nav.Link>
                                <Nav.Link as={RRNavLink} to="/trip" className="rounded-3">Trips</Nav.Link>
                                <Nav.Link as={RRNavLink} to="/tripForm" className="rounded-3">New Trip</Nav.Link>
                                {user && user.userTypeId === 1 && (
                                    <Nav.Link as={RRNavLink} to="/userprofiles">
                                        User Profiles
                                    </Nav.Link>
                                )}
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <Nav.Link as="a" style={{ cursor: "pointer" }} onClick={() => {
                                logout();
                                setIsLoggedIn(false);
                            }}>
                                Logout
                            </Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={RRNavLink} to="/login">Login</Nav.Link>
                                <Nav.Link as={RRNavLink} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
    );
};
