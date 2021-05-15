import { faEnvelope, faLock, faRegistered, faSave, faSignInAlt, faUndo, faUserAlt, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import MyToast from './MyToast';


class Admin_Signup extends Component {
    constructor(props){
        super(props)
        this.state = this.initialState; 
        this.state.show = false;
    }
    initialState = {
        email:'', password:'', userName:'', name:''
    }

    adminSignUp = event =>{
        event.preventDefault();
        const admin = {
            email: this.state.email,
            userName: this.state.userName,
            pass: this.state.password,
            name: this.state.name,
            enrl: '',
            year: 0,
            course: '',
            dept: ''
        }
        axios.post('http://localhost:8080/home/admin-signup', admin)
            .then(response => {
                if (response.data != null){
                    this.setState({'show':true})
                    setTimeout(() => this.setState({'show':false}), 3000);
                }else{
                    this.setState({'show':false})
                }
            })
        this.setState(this.initialState)
    }

    resetForm = () =>{
        this.setState(() => this.initialState) 
    }

    credentialChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const{email, password, userName, name} = this.state;
        return (
            <div>
                    <div>
                    <div styles = {{display: this.state.show ?"block":"none"}}>
                        <MyToast show = {this.state.show} message= {"Admin Created Successfully"} type= {"success"}/>
                    </div>
                    </div>
                    <Row className="justify-content-md-center">
                        <Col xs={5}>
                            <Card className="border border-dark bg-dark text-white">
                                <Card.Header>
                                    <FontAwesomeIcon icon={faUserPlus}/> SignUp
                                </Card.Header>
                                <Form onSubmit={this.adminSignUp}>
                                <Card.Body>
                                <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUserAlt}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control required autoComplete="off" type="text" name="name" value={name}
                                                        className={"bg-dark text-white"} placeholder="Enter Your Name" onChange={this.credentialChange}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control required autoComplete="off" type="email" name="email" value={email}
                                                        className={"bg-dark text-white"} placeholder="Enter Email Address" onChange={this.credentialChange}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUserCircle}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control required autoComplete="off" type="text" name="userName" value={userName}
                                                        className={"bg-dark text-white"} placeholder="Enter User Name" onChange={this.credentialChange}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control required autoComplete="off" type="password" name="password" value={password}
                                                        className={"bg-dark text-white"} placeholder="Enter Password" onChange={this.credentialChange}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                </Card.Body>
                                <Card.Footer style={{"textAlign":"right"}}>
                                    <Button size="sm" type="submit" variant="success" disabled={this.state.email.length === 0 || this.state.password.length === 0 || this.state.name.length===0 || this.state.userName.length === 0}>
                                        <FontAwesomeIcon icon={faSave}/> Submit
                                    </Button>{' '}
                                    <Button size="sm" type="button" variant="info" disabled={this.state.email.length === 0 && this.state.password.length === 0 && this.state.name.length===0 && this.state.userName.length === 0}
                                            onClick={this.resetForm}>
                                        <FontAwesomeIcon icon={faUndo}/> Reset
                                    </Button>
                                </Card.Footer>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default Admin_Signup;