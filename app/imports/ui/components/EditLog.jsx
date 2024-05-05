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
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import FileField from './FileField';
import { PageIDs } from '../utilities/ids';

const bridge = new SimpleSchema2Bridge(
  new SimpleSchema({
    date: Date,
    title: String,
    description: String,
    image: { type: String, optional: true },
    owner: { type: String, optional: true },
    activityDurationHours: {
      type: SimpleSchema.Integer,
      optional: true,
      min: 0,
      max: 24,
    },
    activityDurationMinutes: {
      type: SimpleSchema.Integer,
      optional: true,
      min: 0,
      max: 59,
    },
  }),
);

/* Renders the EditContact page for editing a single document. */
const EditLog = ({ logId }) => {
  const [setImageFile] = useState(null);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  const workoutLog = WorkoutLogs.collection.findOne({ _id: logId });
  console.log(logId);
  console.log(workoutLog);

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Post documents.
    const subscription = Meteor.subscribe(WorkoutLogs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = WorkoutLogs.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  console.log('EditPost', doc, ready);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { image, ...logData } = data;
    const hours = parseInt(data.activityDurationHours, 10);
    const minutes = parseInt(data.activityDurationMinutes, 10);

    if (Number.isNaN(hours) || Number.isNaN(minutes) || hours < 0 || hours > 24 || minutes < 0 || minutes > 59) {
      console.log(hours);
      console.log(minutes);
      swal('Error', 'Please enter a valid input for hours and minutes.', 'error');
      return;
    }

    logData.createdAt = new Date();

    WorkoutLogs.collection.update(logId, { $set: { image, ...logData } }, (error) => {
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
    <div id={PageIDs.editLog}>
      <Button variant="outline-info" size="sm" onClick={handleShow}>Edit Log</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={submit} model={workoutLog}>
            <TextField name="date" type="date" />
            <TextField name="title" />
            <LongTextField name="description" />
            <div className="mb-3">
              <FileField name="image" onChange={handleImageChange} />
            </div>
            <TextField name="owner" />
            <NumField name="activityDurationHours" label="Activity Duration Hours" min={0} max={24} />
            <NumField name="activityDurationMinutes" label="Activity Duration Minutes" min={0} max={59} />
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

EditLog.propTypes = {
  logId: PropTypes.string.isRequired,
};

export default EditLog;
