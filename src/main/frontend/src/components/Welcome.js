import React from 'react';
import { Jumbotron } from 'react-bootstrap';


export default class Welcome extends React.Component{
    render(){
        return(
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to AMS</h1>
                <p>
                  Here you can Manage Alumni.
                </p>
              </Jumbotron>
        );
    }

}
