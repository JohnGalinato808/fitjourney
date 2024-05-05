import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Form, Button } from 'react-bootstrap';
import { Goal } from '../../api/goal/goal';

const GoalComponent = ({ goal }) => {
  const [status, setStatus] = useState(goal ? goal.status : false);
  const [description, setDescription] = useState(goal ? goal.description : '');
  const [deadline, setDeadline] = useState(goal ? goal.deadline : '');

  // Function to handle form submission
  const saveGoal = (e) => {
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
      swal('Success', 'Goal updated successfully', 'success');
    } else {
      // If goal does not exist, insert it
      Goal.collection.insert(goalData);
    }
    console.log(goalData);
  };

  const deleteGoal = () => {
    Goal.collection.remove(goal._id, () => {
      swal('Success', 'Goal deleted successfully', 'success');
    });
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
          <Form>
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
        <td>{deadline.toLocaleString()}</td>
        <td><Button onClick={saveGoal} variant="secondary">Save</Button></td>
        <td><Button onClick={deleteGoal} variant="danger">Delete</Button></td>
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
