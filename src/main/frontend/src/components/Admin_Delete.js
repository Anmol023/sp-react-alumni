import React, {Component} from 'react'
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios';
import { faCheckCircle, faFastBackward, faFastForward, faList, faStepBackward, faStepForward, faTrash, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyToast from './MyToast';

export default class Admin_Delete extends Component{
    constructor(props){
        super(props);
        this.state = {
            alumni: [],
            currentPage : 1,
            userPerPage : 5
        };
        this.state.show = false;
    }

    componentDidMount(){
        this.findAllUser()
    }
    findAllUser(){
        let jwtToken = localStorage.getItem("jwtToken")
        axios.get('http://localhost:8080/admin/all_alumni', {headers:{"Authorization": jwtToken}})
            .then(response => response.data)
            .then((data) => {
                this.setState({alumni: data})
            })
    }

    deleteUser = (id) =>{
        let jwtToken = localStorage.getItem("jwtToken")
        axios.delete("http://localhost:8080/admin/alumni/"+id, {headers:{"Authorization": jwtToken}})
        .then(response => {
            if(response.data!= null){
                this.setState({'show': true,'method': 'del'})
                setTimeout(() => this.setState({'show': false}), 3000)
                this.setState({
                    alumni: this.state.alumni.filter(a => a.id !== id)
                })
            }else{
                this.setState({'show' : false})
            }
        })
    }
    changePage = event =>{
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    firstPage = () =>{
        if(this.state.currentPage>1){
            this.setState({
                currentPage : 1
            })
        }
    }

    prevPage = () =>{
        if(this.state.currentPage >1){
            this.setState({
                currentPage : this.state.currentPage-1
            })
        }
    }

    nextPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.alumni.length/this.state.userPerPage)){
            this.setState({
                currentPage : this.state.currentPage+1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.alumni.length/this.state.userPerPage)){
            this.setState({
                currentPage : Math.ceil(this.state.alumni.length/this.state.userPerPage)
            })
        }
    }

    render(){
        const {alumni ,currentPage, userPerPage} = this.state;
        const lastIndex = currentPage * userPerPage
        const firstIndex = lastIndex - userPerPage;
        const currrentUser = alumni.slice(firstIndex, lastIndex)
        let a = Math.floor(alumni.length/userPerPage)
        let b = alumni.length%userPerPage
        if(a == 0){
            var totalPages = 1
         }else if (b == 0) {
             var totalPages = a
         } else {
             var totalPages = a+1
         }
        const pageNumsCss ={
            width: "45px",
            border : "1px sloid #17A2BB",
            color : "#17A2BB",
            textAlign : "center",
            fontWeight : 'bold'
        }
        return(
            <div>
                <div styles = {{display: this.state.show ?"block":"none"}}>
                    <MyToast show = {this.state.show} message = {"Deleted Successfully"} type = {this.state.method ===  'post'?"success":"danger"}/>
                </div>
            <Card className="border border-dark bg-dark text-white ">
                <Card.Header><FontAwesomeIcon icon={faList}/> Delete Alumni</Card.Header>
                <Card.Body>
                <Table bordered hover stripped variant="dark">
                <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Enrollment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.alumni.length ===0?
                        <tr align="center">
                            <td colSpan="6">No Alumni Available</td>
                        </tr>:
                        currrentUser.map((a, index)=>(
                            <tr key={index}>
                                <td>{<FontAwesomeIcon icon={faUserAstronaut}/>}</td>
                                <td>{a.userName}</td>
                                <td>{a.name}</td>
                                <td>{a.email}</td>
                                <td>{a.enroll}</td>
                                <td>
                                    
                                    <Button size ="block" variant="danger" onClick={this.deleteUser.bind(this, a.id)}><FontAwesomeIcon icon={faTrash} align="center"/></Button>
                                    
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                </Card.Body>
                <Card.Footer>
                {totalPages===0 ?
                        <div style={{'float': 'left'}}>
                            Showing Page 0 off 0
                        </div>:
                        <div style={{'float': 'left'}}>
                            Showing Page {currentPage} off {totalPages}
                        </div>}
                    <div style = {{'float': 'right'}}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button type="button" variant="outline-info" disabled={currentPage ===1 ? true : false} onClick={this.firstPage}>
                                    <FontAwesomeIcon icon = {faFastBackward}/>First
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage ===1 ? true : false} onClick={this.prevPage}>
                                <FontAwesomeIcon icon = {faStepBackward}/>Prev
                                </Button>
                            </InputGroup.Prepend>
                            <FormControl style = {pageNumsCss} className="bg-dark" name="currentPage" value={currentPage} onChange={this.changePage}/>
                            <InputGroup.Append>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                <FontAwesomeIcon icon = {faFastForward}/>Next
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
                                <FontAwesomeIcon icon = {faStepForward}/>Last
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Card.Footer>
            </Card>
            </div>
        )
    }

}
