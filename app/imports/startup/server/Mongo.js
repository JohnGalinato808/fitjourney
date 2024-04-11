import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';

const addProfile = (profile) => {
  console.log(`  Adding: ${profile.firstName} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(data => addProfile(data));
  }
}

const createLog = (log) => {
  console.log(`  Creating: ${log.title} (${log.owner})`);
  WorkoutLogs.collection.insert(log);
};

if (WorkoutLogs.collection.find().count() === 0) {
  if (Meteor.settings.defaultLogs) {
    console.log('Creating default logs.');
    Meteor.settings.defaultLogs.forEach(data => createLog(data));
  }
}
