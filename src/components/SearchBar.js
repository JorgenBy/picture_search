import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../assets/logo.png';

const SearchBar = ({ onSubmit }) => {
    const [term, setTerm] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(term);
    };

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="GoPicture"
                    />{' '}
                    GoPicture
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="navbarSearch" className="justify-content-center">
                    <Form className="d-flex" onSubmit={onFormSubmit}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                        <Button
                            variant="outline-success"
                            onClick={e => e.target.blur()}
                            type="submit"
                        >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SearchBar;