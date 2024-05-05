import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Col, Row, Table, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPanel = () => {
  // const [viewUsers] = useState(false);

  const { users, isLoading } = useTracker(() => {
    const noDataAvailable = { users: [] };

    if (!Meteor.userId()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('allUsersWithRoles');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const allUsers = Meteor.users.find({}, {
      fields: { username: 1, emails: 1, role: 1, isActive: 1 },
    }).fetch().map(user => {
      const rolesList = Roles.getRolesForUser(user._id);
      const roles = rolesList.join(', ');
      return {
        ...user,
        roles,
      };
    });
    // eslint-disable-next-line no-console
    console.log(allUsers);
    return { users: allUsers };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Add a Account Activation Toggle handler
  const handleToggleActive = (userId, e) => {
    const isActive = e.target.checked;
    // Call a Meteor method to update the user's active status
    Meteor.call('toggleUserActive', userId, isActive, (error) => {
      if (error) {
        e.target.checked = false;
        // eslint-disable-next-line no-alert
        alert(`Error toggling user active status: ${error.message}`);
        // eslint-disable-next-line no-console
        console.log(e.target.checked);
      } else {
        // eslint-disable-next-line no-console
        console.log(e.target.checked);
        e.target.checked = true;
        const status = isActive ? 'Active' : 'Inactive';
        // eslint-disable-next-line no-alert
        alert(`User active status updated to ${status}`);
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className="mt-5">
          <Row>
            <Col xs={10}>
              <h2 style={{ fontWeight: 'bold' }} className="p-3">Admin Panel</h2>
            </Col>
          </Row>
          <Table hover className="workoutlog-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.emails[0].address}</td>
                  <td>{user.roles ? user.roles : 'No role'}</td>
                  <td>
                    {
                      (!user.roles.includes('admin')) ? (
                        <Form.Check
                          type="switch"
                          id={`active-switch-${user._id}`}
                          checked={user.isActive}
                          onChange={(e) => handleToggleActive(user._id, e)}
                        />
                      ) : ('')
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
