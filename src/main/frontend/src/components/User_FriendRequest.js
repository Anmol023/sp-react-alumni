import React, {Component} from 'react'
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios';
import { faCheckCircle, faFastBackward, faFastForward, faList, faPlusSquare, faStepBackward, faStepForward, faTrash, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyToast from './MyToast'

export default class User_FriendRequest extends Component{
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
        this.allFriendRequest()
    }
    allFriendRequest = () =>{
        let jwtToken = localStorage.getItem("jwtToken")
        let email = localStorage.getItem("email1")
        let input = {
                "email" : email
        } 
        axios.post("http://localhost:8080/user/getFriendRequestList",input, {headers:{"Authorization": jwtToken}})
            .then(response => response.data)
            .then((data) => {
                this.setState({alumni: data})
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

    addFriend = (email2) =>{
        let jwtToken = localStorage.getItem("jwtToken")
        let email1 = localStorage.getItem("email1")
        let input = {
            "friends":  [`${email1}`,`${email2}`]
        }
        axios.post("http://localhost:8080/user/acceptFriendRequest",input, {headers:{"Authorization": jwtToken}})
            .then(response =>{
                if(response.data!= null){
                    this.setState({'show':true, 'method': 'post'})
                    setTimeout(() => this.setState({'show':false}), 3000);
                    this.setState({
                        alumni: this.state.alumni.filter(a => a.email !== email2)
                    })
                }else{
                    this.setState({'show':false})
                }
            })
       
    }

    deleteRequest = (name) =>{
        let jwtToken = localStorage.getItem("jwtToken")
        axios.delete("http://localhost:8080/admin/"+name, {headers:{"Authorization": jwtToken}})
        .then(response => {
            if(response.data!= null){
                this.setState({'show': true,'method': 'del'})
                setTimeout(() => this.setState({'show': false}), 3000)
                this.setState({
                    alumni: this.state.alumni.filter(a => a.userName !== name)
                })
            }else{
                this.setState({'show' : false})
            }
        })
    }

    render(){
        const {alumni ,currentPage, userPerPage} = this.state;
        const lastIndex = currentPage * userPerPage
        const firstIndex = lastIndex - userPerPage;
        const currrentUser = alumni.slice(firstIndex, lastIndex)
        let a = Math.floor(alumni.length/userPerPage)
        let b = alumni.length%userPerPage
        if(a === 0){
           var totalPages = b
        }else if (b === 0) {
            var totalPages = a
        } else {
            var totalPages = a+b
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
                    <MyToast show = {this.state.show} message = {this.state.method ===  'post'? "Verified Successfully.": "Deleted Successfully"} type = {this.state.method ===  'post'?"success":"danger"}/>
                </div>
                <Card className="border border-dark bg-dark text-white ">
                <Card.Header><FontAwesomeIcon icon={faWineBottle}/> All Requests</Card.Header>
                <Card.Body>
                    <Table bordered hover stripped="true" variant="dark">
                        <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.alumni.length ===0?
                                <tr align="center">
                                    <td colSpan="6">No User Available</td>
                                </tr>:
                                currrentUser.map((a, index)=>(
                                    <tr key={index}>
                                        <td>{a.id}</td>
                                        <td>{a.userName}</td>
                                        <td>{a.email}</td>
                                        <td>{a.course}</td>
                                        <td>{a.year}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary" onClick={this.addFriend.bind(this, a.email)}><FontAwesomeIcon icon={faPlusSquare} /></Button>{' '}
                                                <Button size ="sm" variant="outline-danger" onClick={this.deleteRequest.bind(this, a.email)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
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
