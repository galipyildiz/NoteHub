import AppContext from './AppContext'
import './Home.css';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Navbar, Nav, NavDropdown, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const ctx = useContext(AppContext);
    const apiroot = process.env.REACT_APP_API_ROOT;
    const token = ctx.token;
    const [notes, setNotes] = useState([]);
    const emptyNote = { id: 0, title: "", content: "", createdTime: "", modifiedTime: "" };
    const [note, setNote] = useState({...emptyNote}); //klonunu aldım
   

    const loadNotes = function () {
        axios.get(apiroot + "/api/Notes", { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                setNotes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const addNewNote = function () {
        axios.post(apiroot + "/api/Notes", { title: "New Note", content: "" }, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                const note = response.data;
                setNotes([...notes, note]);//mevcut notların sonuna yeni gelen notu ekle
            })
    };

    const saveNote = function () {
        axios.put(apiroot + "/api/Notes/" + note.id,
            { id: note.id, title: note.title, content: note.content },
            { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                //loadNotes(); //basit yöntem
                const newNotes = [...notes];
                const selectedNote = newNotes.find((x) => x.id == note.id);
                selectedNote.title = note.title;
                selectedNote.content = note.content;
                setNotes(newNotes);
            })
    };

    const deleteNote = function () {
        axios.delete(apiroot + "/api/Notes/" + note.id, { headers: { Authorization: "Bearer " + token } })
        .then(function (response){
            const newNotes = notes.filter((x) => x.id != note.id);//yeni dizi döndü 
            setNotes(newNotes);
            setNote({...emptyNote});
        })
    };

    const handleTitleClick = function (e, note) {
        e.preventDefault();
        setNote(note);
    };

    const handleNewNoteClick = function (e) {
        e.preventDefault();
        addNewNote();
    };

    const handleSaveClick = function (e) {
        e.preventDefault();
        saveNote();
    };

    const handleDeleteClick = function (e) {
        e.preventDefault();
        deleteNote();
    };

    useEffect(() => {
        loadNotes();
    }, []);//değişebilcek bişey yok 1 kere çalış bit.

    return (
        <div className="home-wrapper">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">NoteHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Nav >
                        <NavDropdown alignRight title="My Account" id="basic-nav-dropdown">
                            <Link to="/logout" className="dropdown-item" > Logout ({ctx.username})</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid className="flex-fill">
                <Row className="h-100">
                    <Col sm={4} md={3}>
                        <h3 className="mt-3 d-flex">
                            My Notes
                            <Button variant="success" className="ml-auto" onClick={handleNewNoteClick} >
                                <i className="fas fa-plus"></i>
                            </Button>
                        </h3>
                        <ListGroup activeKey={"#notes-" + note.id}>
                            {notes.map((note, index) =>
                                <ListGroup.Item action href={"#notes-" + note.id} onClick={(e) => handleTitleClick(e, note)} key={note.id} >
                                    {note.title}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col sm={8} md={9} className="h-100">
                        <Form className="py-3 h-100 d-flex flex-column">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="flex-fill">
                                <Form.Control as="textarea" rows={10} className="h-100" placeholder="Content" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} />
                            </Form.Group>
                            <div>
                                <Button variant="primary" onClick={handleSaveClick} >Save</Button>
                                <Button variant="danger" className="ml-2" onClick={handleDeleteClick} >Delete</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Home;
