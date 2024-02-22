import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Posts } from '../../api/post/post';
import FileField from '../components/FileField';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Posts.schema);

const EditPost = () => {
  // const [imageFile, setImageFile] = useState(null);
  const [setImageFile] = useState(null);
  const { _id } = useParams();
  // eslint-disable-next-line no-unused-vars
  let fRef = null;
  const user = Meteor.user();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const { doc, ready } = useTracker(() => {
    // Get access to Post documents.
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Posts.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditPost', doc, ready);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { image, ...postData } = data;
    const hours = parseInt(data.activityDurationHours, 10);
    const minutes = parseInt(data.activityDurationMinutes, 10);

    if (Number.isNaN(hours) || Number.isNaN(minutes) || hours < 0 || hours > 24 || minutes < 0 || minutes > 59) {
      swal('Error', 'Please enter a valid input for hours and minutes.', 'error');
      return;
    }

    postData.createdAt = new Date();

    Posts.collection.update(_id, { $set: { image, ...postData } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <div id={PageIDs.addPost}>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={5}>
            <Col className="text-center"><h2>Edit Post</h2></Col>
            <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} model={doc} onSubmit={submit}>
              <Card style={{ backgroundColor: 'white', border: 'none' }}>
                <Card.Body>
                  <TextField id={ComponentIDs.addPostTitle} inputClassName="border-dark" name="title" />
                  <div className="mb-3">
                    <FileField name="image" onChange={handleImageChange} />
                  </div>
                  <LongTextField id={ComponentIDs.addPostContent} inputClassName="border-dark" name="contents" />
                  <NumField id={ComponentIDs.addPostActivityDurationHours} name="activityDurationHours" label="Hours Spent" min={0} max={24} />
                  <NumField id={ComponentIDs.addPostActivityDurationMinutes} name="activityDurationMinutes" label="Minutes Spent" min={0} max={59} />
                  <ErrorsField />
                  <SubmitField id={ComponentIDs.addPostSubmit} inputClassName="p-2 bg-white border-1 rounded-1 mt-1" value="Submit" />
                  <HiddenField name="createdAt" value={new Date()} />
                  {user ? <HiddenField name="owner" value={user.username} /> : null}
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default EditPost;
