import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Goal as GoalLogs } from '../../api/goal/goal';

const bridge = new SimpleSchema2Bridge(
  new SimpleSchema({
    status: Boolean,
    description: {
      type: String,
      max: 1000,
    },
    deadline: Date,
    owner: String,
  }),
);

/* Renders the EditContact page for editing a single document. */
const EditGoal = ({ goalId }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  const goalLog = GoalLogs.collection.findOne({ _id: goalId });
  console.log(`logId: ${goalId}`);
  console.log(`goalLog: ${goalLog}`);

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Post documents.
    const subscription = Meteor.subscribe(GoalLogs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = GoalLogs.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  console.log('EditGoal', doc, ready);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { ...logData } = data;

    logData.createdAt = new Date();

    GoalLogs.collection.update(goalId, { $set: { ...logData } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Workout Log updated successfully', 'success').then(() => {
          setShow(false);
        });
      }
    });
  };

  return (
    <div>
      <Button variant="outline-info" size="sm" onClick={handleShow}>Edit Goal</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={submit} model={GoalLogs}>
            <TextField name="deadline" type="date" />
            <LongTextField name="description" />
            <ErrorsField />
            <SubmitField value="Submit" />
          </AutoForm>
          {/* <div>
            <span style={{ fontWeight: 'bold' }}>
              Date:&nbsp;
            </span>
            <span>
              {(workoutLog.date instanceof Date ? workoutLog.date : new Date(workoutLog.date)).toLocaleDateString('en-US')}
            </span>
          </div>
          <Row>
            <Col xs={12}><Image src={workoutLog.image} style={{ width: '100%' }} /></Col>
          </Row>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              Title:&nbsp;
            </span>
            <span>
              {workoutLog.title}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              Description:&nbsp;
            </span>
            <span>
              {workoutLog.description}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              Duration:&nbsp;
            </span>
            <span>
              {String(workoutLog.activityDurationHours).padStart(2, '0')}:
              {String(workoutLog.activityDurationMinutes).padStart(2, '0')}
            </span>
          </div> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

EditGoal.propTypes = {
  goalId: PropTypes.string.isRequired,
};

export default EditGoal;
