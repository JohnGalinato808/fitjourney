import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(WorkoutLogs.userPublicationName, function () {
  if (this.userId) {
    return WorkoutLogs.collection.find();
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
