import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Table, Button, Form, Pagination } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Goal from '../components/Goal';
import { Goal as GoalCollection } from '../../api/goal/goal';

const Dashboard = () => {
  const logsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMyLogs] = useState(false);

  const { goallogs, ready } = useTracker(() => {
    const goalLogSubscription = Meteor.subscribe(GoalCollection.userPublicationName);
    const rdy = goalLogSubscription.ready();
    const goalLogItems = GoalCollection.collection.find({}).fetch();
    return {
      goallogs: goalLogItems,
      ready: rdy,
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  let filteredLogs = goallogs.filter(goal => goal.description.toLowerCase().includes(searchTerm.toLowerCase())
    || goal.description.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(goallogs);

  if (viewMyLogs) {
    filteredLogs = filteredLogs.filter(goal => goal.owner === Meteor.user().username);
  }

  filteredLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const startIndex = (activePage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);
  console.log(paginatedLogs);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredLogs.length / logsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    ready ? (
      <Container>
        <Row>
          <Col xs={12} className="mt-5">
            <Row>
              <Col xs={10}>
                <h2 style={{ fontWeight: 'bold' }} className="p-3">Dashboard</h2>
              </Col>
              <Col xs={2} style={{ alignContent: 'center' }}>
                <Button href="/creategoal" variant="success" style={{ width: '100%' }}>Create Goal</Button>
              </Col>
            </Row>
            <Form className="mb-3" onSubmit={handleSearchSubmit}>
              <Form.Group controlId="searchBar">
                <Row style={{ margin: 0, padding: '2% 0' }}>
                  <Col xs={12}>
                    <Form.Control type="text" placeholder="Search by Description" value={searchTerm} onChange={handleSearchChange} />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <Table hover className="workoutlog-table">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Goal</th>
                  <th>Deadline</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              {paginatedLogs.map((goal) => <Goal key={goal._id} goal={goal} />)}
            </Table>
            {pageNumbers.length > 1 && (
              <Pagination className="justify-content-center mt-3">
                {pageNumbers.map(number => (
                  <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default Dashboard;
