import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  Roles.createRole(role, { unlessExists: true });
  Roles.addUsersToRoles(userID, role);
};

Accounts.onCreateUser((options, user) => {
  // Assign the isActive field a default value
  const userWithActiveStatus = {
    ...user,
    isActive: true, // Add new properties
  };

  return userWithActiveStatus;
});

Accounts.validateLoginAttempt((attempt) => {
  if (attempt.user && attempt.user.isActive === false) {
    throw new Meteor.Error('account-disabled', 'Your account has been disabled.');
  }
  return true;
});

if (Meteor.users.find().count() === 0) {
  console.log('------------------- insert default Accounts -------------------');
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
