import React from 'react';
import { Jumbotron } from 'react-bootstrap';


export default class Admin_Welcome extends React.Component{
    render(){
        return(
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome Admin</h1>
                <p>
                  Here you can Manage Alumni.
                </p>
              </Jumbotron>
        );
    }

}

