import { faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutUser} from '../services/index'

class Admin_NavigationBar extends React.Component{
    

    logout = () =>{
        this.props.logoutUser()
    }
    render(){
        const uName = localStorage.getItem("userName")
        const guestLinks =
            <>  
            <Link to={""} className="navbar-brand">AMS</Link>
                <div className="mr-auto"/>
                <Nav className="navbar-right">
                    <Link to="/admin/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus}/>Admin</Link>
                    <Link to="/user/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus}/>User</Link>
                    <Link to="/login" className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                </Nav>
            </>

        const adminLinks = 
        <>
        <Link to="/admin" className="navbar-brand">AMS</Link>
            <Nav className="mr-auto">
                <Link to="/admin/verify" className="nav-link">Verify</Link>
                <Link to="/admin/all" className="nav-link">All</Link>
                <Link to="/admin/delete" className="nav-link">Delete</Link>
            </Nav>
            <Nav>
                <Link to="/logout" className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
            </Nav>
        </>
        const userLinks = 
        <>
        <Link to="/user" className="navbar-brand">AMS</Link>
            <Nav className="mr-auto">
                <Link to="/user/add_friend" className="nav-link">Add Friend</Link>
                <Link to="/user/friends" className="nav-link">All Friend</Link>
                <Link to="/user/friend_requests" className="nav-link">Requests</Link>
                <Link to={"/user/update/"+uName} className="nav-link">Update</Link>
            </Nav>
            <Nav>
                <Link to="/logout" className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
            </Nav>
        </>
        return (
            <Navbar bg="dark" variant="dark">
                
                
                {this.props.auth.isLoggedIn ? ((localStorage.getItem('role') == "ROLE_ADMIN")?adminLinks:userLinks) : guestLinks}
                
            </Navbar>
        );
    }
}
const mapStateToProps = state =>{
    return{
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        logoutUser: ()=> dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin_NavigationBar)