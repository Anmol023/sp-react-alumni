import { faEnvelope, faLock, faSignInAlt, faUndo, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Alert, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import {authenticateUser} from '../services/index'
import {  Route } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = this.initialState;
    }
    initialState = {
        userName:'', password:'', error:''
    }

    resetForm = () =>{
        this.setState(() => this.initialState) 
    }

    credentialChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    validateUser = () =>{
        this.props.authenticateUser(this.state.userName, this.state.password)
        setTimeout(() =>{
            if(this.props.auth.isLoggedIn){
                if (localStorage.getItem('role') == "ROLE_ADMIN"){
                    return this.props.history.push('/admin')
                }else{
                    return this.props.history.push('/user')
                }
                
            }else{
                this.resetForm()
                this.setState({"error": "Invalid username or password"})
            }
        }, 500)
    }

    render() {
        const{userName, password, error} = this.state;
        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className="border border-dark bg-dark text-white">
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Card.Header>
                        <Card.Body>
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
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="button" variant="success" disabled={this.state.userName.length === 0 || this.state.password.length === 0}
                                    onClick={this.validateUser}>
                                <FontAwesomeIcon icon={faSignInAlt}/>Login
                            </Button>{' '}
                            <Button size="sm" type="button" variant="info" disabled={this.state.userName.length === 0 && this.state.password.length === 0 && this.state.error.length===0}
                                    onClick={this.resetForm}>
                                <FontAwesomeIcon icon={faUndo}/>Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state =>{
    return {
        auth : state.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        authenticateUser: (userName, password) => dispatch(authenticateUser(userName, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);