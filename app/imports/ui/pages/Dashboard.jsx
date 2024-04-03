import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => (
  <Container>
    <h2 className="pt-3">My Dashboard</h2>
    <Container className="py-3 bg-light rounded border">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>My Activities</h2></Col>
        </Col>
      </Row>
    </Container>
    <Container className="py-3 bg-light rounded border">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Goals</h2></Col>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default Dashboard;
