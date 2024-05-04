import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, LongTextField, SubmitField, ErrorsField, HiddenField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Goal as GoalLogs } from '../../api/goal/goal';

const bridge = new SimpleSchema2Bridge(GoalLogs.schema);

const CreateGoal = () => {
  let fRef = null;
  const user = Meteor.user();
  const submit = (data) => {
    const { ...goalContent } = data;

    goalContent.date = new Date();
    goalContent.status = 0;
    goalContent.owner = user ? user.username : 'Anonymous';

    // Insert post function
    // eslint-disable-next-line no-shadow
    const insertGoal = (data) => {
      GoalLogs.collection.insert(data, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Goal added successfully', 'success').then(() => {
            window.location.href = '/dashboard';
          });
          if (fRef) {
            fRef.reset();
          }
        }
      });
    };
    insertGoal(goalContent);
  };

  return (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={5}>
            <Col className="text-center"><h2>Create Log</h2></Col>
            <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={submit}>
              <Card style={{ backgroundColor: 'white', border: 'none' }}>
                <Card.Body>
                  <DateField inputClassName="border-dark" name="deadline" />
                  <LongTextField inputClassName="border-dark" name="description" />
                  <HiddenField name="status" value={0} />
                  <ErrorsField />
                  <SubmitField inputClassName="p-2 bg-white border-1 rounded-1 mt-1" value="Submit" />
                  {user ? <HiddenField name="owner" value={user.username} /> : null}
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateGoal;
