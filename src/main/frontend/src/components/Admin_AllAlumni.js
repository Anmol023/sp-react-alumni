import React, {Component} from 'react'
import {Alert, Button, Card, FormControl, InputGroup, Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchUsers} from '../services/user/userActions'
import {faFastBackward, faFastForward, faStepBackward, faStepForward, faUsers} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Admin_AllAlumni extends Component{
constructor(props){
    super(props);
    this.state = {
        users: [],
        currentPage : 1,
        userPerPage : 5
    };
}

componentDidMount(){
    //this.findAllUser()
    this.props.fetchUsers();
}
    /*findAllUser(){
        axios.get('http://localhost:8080/admin/all_alumni')
            .then(response => response.data)
            .then((data) => {
                this.setState({alumni: data})
        })
    }*/

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
        if(this.state.currentPage < Math.ceil(this.props.userData.users.length/this.state.userPerPage)){
            this.setState({
                currentPage : this.state.currentPage+1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.sprops.userData.users.length/this.state.userPerPage)){
            this.setState({
                currentPage : Math.ceil(this.state.users.length/this.state.userPerPage)
            })
        }
    }

    render(){
        const {currentPage, userPerPage} = this.state;
        const userData = this.props.userData;
        const users = userData.users;
        const lastIndex = currentPage * userPerPage
        const firstIndex = lastIndex - userPerPage;
        const currrentUser = users.slice(firstIndex, lastIndex)
        let a = Math.floor(users.length/userPerPage)
        let b = users.length%userPerPage
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
            color : "17A2BB",
            textAlign : "center",
            fontWeight : 'bold'
        }
        return(
            <div>
                {userData.error ?
                    <Alert variant="danger">
                        {userData.error}
                    </Alert> :
                <Card className="border border-dark bg-dark text-white ">
                    <Card.Header><FontAwesomeIcon icon={faUsers} /> All Alumni</Card.Header>
                    <Card.Body>
                    <Table bordered hover stripped="true" variant="dark">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Year</th>
                                <th>Course</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        users.length ===0?
                            <tr align="center">
                                <td colSpan="6">No Alumni Available</td>
                            </tr>:
                            currrentUser.map((a, index)=>(
                                <tr key={index}>
                                    <td>{a.id}</td>
                                    <td>{a.userName}</td>
                                    <td>{a.name}</td>
                                    <td>{a.email}</td>
                                    <td>{a.year}</td>
                                    <td>{a.course}</td>
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
    }
            </div>
        )
    }

}

const mapStateToProps = state =>{
    return{
        userData: state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin_AllAlumni);