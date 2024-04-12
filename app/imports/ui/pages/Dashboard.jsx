import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Goal from '../components/Goal';
import { Goal as GoalCollection } from '../../api/goal/goal';

const Dashboard = () => {
  // State to store goals fetched from the database
  const [goals, setGoals] = useState([]);

  // Function to fetch goals from the database
  const fetchGoals = () => {
    const fetchedGoals = GoalCollection.collection.find().fetch();
    setGoals(fetchedGoals);
    console.log(fetchedGoals);
  };

  // Fetch goals when the component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <Container>
      <h2 className="pt-3">My Dashboard</h2>
      <Container className="py-3 bg-light rounded border">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Col className="text-center"><h2>My Activities</h2></Col>
          </Col>
        </Row>
      </Container>
      <br />
      <Container className="py-3 bg-light rounded border">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Col className="text-center"><h2>Goals</h2></Col>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={10}>
            <Table hover>
              <thead>
                <tr>
                  <th> </th>
                  <th>Goal</th>
                  <th>Deadline</th>
                  <th> </th>
                  <th> </th>
                </tr>
              </thead>
              {goals.map((goal) => (
                <Goal key={goal._id} goal={goal} />
              ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Dashboard;
