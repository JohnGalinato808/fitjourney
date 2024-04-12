import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import { Goal } from '../../api/goal/goal';
import { Comments } from '../../api/comment/comment';
import { Surveys } from '../../api/survey/survey';
import { Votes } from '../../api/vote/vote';
import { ModCards } from '../../api/modcard/modcard';

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find();
  }
  return this.ready();
});
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

Meteor.publish(Goal.userPublicationName, function () {
  if (this.userId) {
    return Goal.collection.find();
  }
  return this.ready();
});

Meteor.publish(Votes.userPublicationName, function () {
  if (this.userId) {
    return Votes.collection.find();
  }
  return this.ready();
});

Meteor.publish(ModCards.userPublicationName, function () {
  if (this.userId) {
    return ModCards.collection.find();
  }
  return this.ready();
});

Meteor.publish(Surveys.userPublicationName, function () {
  if (this.userId) {
    return Surveys.collection.find();
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
