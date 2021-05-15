import React from 'react';
import { Jumbotron } from 'react-bootstrap';


export default class User_Welcome extends React.Component{
    render(){
        return(
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome User</h1>
                <p>
                  User specific operations.
                </p>
              </Jumbotron>
        );
    }

}