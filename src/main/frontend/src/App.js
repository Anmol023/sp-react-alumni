import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer';
import SignupAlumni from './components/SignupAlumni';
import Admin_Welcome from './components/Admin_Welcome';
import Admin_NavigationBar from './components/Admin_NavigationBar';
import Admin_VerifyAlumni from './components/Admin_VerifyAlumni';
import Admin_AllAlumni from './components/Admin_AllAlumni';
import Admin_Signup from './components/Admin_Signup';
import Login from './components/Login';
import User_Welcome from './components/User_Welcome';
import Welcome from './components/Welcome';
import User_FriendList from './components/User_FriendList';
import User_AddFriend from './components/User_AddFriend';
import User_FriendRequest from './components/User_FriendRequest';
import Admin_Delete from './components/Admin_Delete';

function App() {

  const marginTop ={
    marginTop :"20px"
  };

  return (
    <Router>
      <Admin_NavigationBar/>
      <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Switch>
                <Route path = "/admin" exact component={Admin_Welcome}/>
                <Route path = "/admin/all" exact component={Admin_AllAlumni}/>
                <Route path = "/admin/verify" exact component={Admin_VerifyAlumni}/>
                <Route path = "/admin/register" exact component={Admin_Signup}/>
                <Route path = "/admin/delete" exact component={Admin_Delete}/>
                <Route path = "/login" exact component={Login}/>
                <Route path = "/logout" exact component={Welcome}/>
                <Route path = "/" exact component={Welcome}/>
                <Route path = "/user/register" exact component={SignupAlumni}/>
                <Route path = "/user" exact component={User_Welcome}/>
                <Route path = "/user/update/:uName" exact component={SignupAlumni}/>
                <Route path = "/user/friends" exact component={User_FriendList}/>
                <Route path = "/user/add_friend" exact component={User_AddFriend}/>
                <Route path = "/user/friend_requests" exact component={User_FriendRequest}/>
              </Switch>
            </Col>
          </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
