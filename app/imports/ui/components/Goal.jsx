import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Goal } from '../../api/goal/goal';

const GoalComponent = ({ goal }) => {
  const [status, setStatus] = useState(goal ? goal.status : false);
  const [description, setDescription] = useState(goal ? goal.description : '');
  const [deadline, setDeadline] = useState(goal ? goal.deadline : '');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = Meteor.userId(); // Retrieve the current user's ID
    const goalData = {
      status,
      description,
      deadline,
      owner: userId,
    };
    if (goal) {
      // If goal exists, update it
      Goal.collection.update(goal._id, { $set: goalData });
    } else {
      // If goal does not exist, insert it
      Goal.collection.insert(goalData);
    }
    console.log(goalData);
  };

  // Function to fetch data from database
  useEffect(() => {
    console.log(goal);
    if (goal) {
      setStatus(goal.status);
      setDescription(goal.description);
      setDeadline(goal.deadline);
    }
  }, [goal]);

  return (
    <tbody>
      <tr>
        <td>
          <Form onSubmit={handleSubmit}>
            <Form.Check
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </Form>
        </td>
        <td>
          <Form.Control
            as="textarea"
            rows={1}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </td>
        <td>{deadline}</td>
        <td><Button>Save</Button></td>
        <td><Button>Delete</Button></td>
      </tr>
    </tbody>
  );
};

GoalComponent.propTypes = {
  goal: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default GoalComponent;
