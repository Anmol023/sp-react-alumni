import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react'
import { Card, Form, Button,Col } from 'react-bootstrap'
import axios from 'axios'
import MyToast from './MyToast';


export default class SignupAlumni extends Component{
    constructor(props){
        super(props);
        this.state= this.initialState;
        this.alumniSignup = this.alumniSignup.bind(this);
        this.alumniChange = this.alumniChange.bind(this);
        this.changeCourse = this.changeCourse.bind(this);
        this.state.show = false

    }

    initialState ={
        userId:'', emailId:'', pass:'', userName:'', year:'', enrl:'', courses:[], depts:[], name:'',selectedCourse: '', selectedDept:''
    }
    componentDidMount(){
        this.setState({
            courses : [
                {name: "BE/B.Tech", depts :["Civil Engeneering", "Mechanical Engineering", "Electrical Engineering","Computer Science Engineering"]},
                {name: "M.Tech", depts: ["Civil Engeneering", "Mechanical Engineering", "Electrical Engineering","Computer Science Engineering"]},
                {name:"MCA", depts: []},
                {name:"MBA", depts: []}
            ]
        })
        const userId = this.props.match.params.uName
        console.log(userId)
        if (userId){
            this.findById(userId);
        }
    }

    findById = (userId) =>{
        let jwtToken = localStorage.getItem("jwtToken")
        axios.get("http://localhost:8080/user/"+userId, {headers:{"Authorization": jwtToken}})
            .then(response =>{
                if(response.data!= null){
                    this.setState({
                        userId: response.data.userName,
                        emailId: response.data.email,
                        userName: response.data.userName,
                        pass: response.data.pass,
                        name: response.data.name, 
                        enrl: response.data.enrl,
                        selectedCourse: response.data.course,
                        selectedDept: response.data.dept,
                        year: response.data.year,
                    })
                }
                console.log(this.state)
            }).catch((error) =>{
                console.error("Error"+ error)
            })
    }

    changeCourse= event =>{
        this.setState({selectedCourse: event.target.value});
        this.setState({depts : this.state.courses.find(cour => cour.name === event.target.value).depts});
    }

    resetAlumni = ()=>{
        this.setState(()=> this.initialState)
    }

    updateUser = event =>{
        event.preventDefault();
        const alumni = {
            userId: this.state.userName,
            email: this.state.emailId,
            userName: this.state.userName,
            pass: this.state.pass,
            name: this.state.name, 
            enrl: this.state.enrl,
            course: this.state.selectedCourse,
            dept: this.state.selectedDept,
            year: this.state.year,
        }
        const userId = this.props.match.params.uName
        let jwtToken = localStorage.getItem("jwtToken")
        console.log(this.state.userId)
        axios.put('http://localhost:8080/user/'+userId, alumni, {headers:{"Authorization": jwtToken}})
            .then(response => {
                if (response.data != null){
                    this.setState({'show':true})
                    setTimeout(() => this.setState({'show':false}), 3000);
                    setTimeout(() => this.userList, 3000);
                }else{
                    this.setState({'show':false})
                }
            })
    }
    

    alumniSignup= event =>{
        event.preventDefault();
        const alumni = {
            email: this.state.emailId,
            userName: this.state.userName,
            pass: this.state.pass,
            name: this.state.name, 
            enrl: this.state.enrl,
            course: this.state.selectedCourse,
            dept: this.state.selectedDept,
            year: this.state.year,
        }
        axios.post('http://localhost:8080/home/alumni-signup', alumni)
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


    alumniChange= event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

        render(){
            const {emailId, pass, userName, year, enrl, name, selectedCourse, selectedDept} = this.state

            return(
                <div>
                    <div>
                    <div styles = {{display: this.state.show ?"block":"none"}}>
                        <MyToast show = {this.state.show} message= {this.state.userId?"Update Successfull":"Sent for Verification"} type= {"success"}/>
                    </div>
                    </div>
                <Card className="border border-dark bg-dark text-white ">
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> {this.state.userId?"Alumni Update":"Alumni Register"}</Card.Header>
                    <Form onReset={this.resetAlumni} onSubmit={this.state.userId?this.alumniSignup:this.updateUser} id="alumniSignupId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group controlId="formBasicEmail" as={Col}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name = "emailId" value={emailId} onChange={this.alumniChange}
                                                required className="bg-dark text-white" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>UserName</Form.Label>
                                <Form.Control type="text" required autoComplete="off" name="userName" value={userName} onChange={this.alumniChange}
                                                className="bg-dark text-white" placeholder="Username" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formBasicPassword" as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" required name="pass" value={pass} onChange={this.alumniChange}
                                                className="bg-dark text-white" placeholder="Password"/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" required autoComplete="off" name = "name" value={name} onChange={this.alumniChange}
                                                className="bg-dark text-white" placeholder="Full Name" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col}>
                                <Form.Label>Enrollment Number</Form.Label>
                                <Form.Control type="text" required autoComplete="off" name = "enrl" value={enrl} onChange={this.alumniChange}
                                                className="bg-dark text-white" placeholder="Enrollment No." />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom" as={Col}>
                                <Form.Label>Course</Form.Label>
                                <Form.Control as="select" custom required autoComplete="off" name = "selectedCourse" value={selectedCourse} onChange={this.changeCourse}
                                                className="bg-dark text-white">
                                                    <option className="text-muted">--Choose Course--</option>
                                                    {this.state.courses.map((e, key) => {
                                                        return <option key={key}>{e.name}</option>;
                                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group controlId="exampleForm.SelectCustom1" as={Col}>
                                <Form.Label>Branch</Form.Label>
                                <Form.Control as="select" custom autoComplete="off" name ="selectedDept" value={selectedDept} onChange={this.alumniChange}
                                                className="bg-dark text-white" disabled={selectedCourse==="MCA" || selectedCourse==="MBA"}>
                                                    <option className="text-muted">--Choose Department--</option>
                                                        {this.state.depts.map((e, key) => {
                                                        return <option key={key}>{e}</option>;
                                                    })}
                                </Form.Control>
                            </Form.Group>                    
                            <Form.Group as={Col}>
                                <Form.Label>Year</Form.Label>
                                <Form.Control type="number" required autoComplete="off" name = "year" value={year} onChange={this.alumniChange}
                                                className="bg-dark text-white" placeholder="Year" />
                            </Form.Group>
                        </Form.Row> 
                    </Card.Body>
                    <Card.Footer>
                        <Button size="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> {this.state.userId?"Update":"Submit"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>
                    </Card.Footer>
                    </Form>
                </Card>
                </div>
            )
        }
}