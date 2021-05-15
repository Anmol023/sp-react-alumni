import React from 'react'
import { Col, Container, Navbar } from 'react-bootstrap'

export default class Footer extends React.Component{
    render(){
        let fullYear = new Date().getFullYear();
        return(
            <Navbar fixed="bottom" variant="dark" bg="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullYear}-{fullYear+1}</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }

}