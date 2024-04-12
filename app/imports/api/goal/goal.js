import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class GoalCollection {
  constructor() {
    this.name = 'GoalCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      status: Boolean,
      description: {
        type: String,
        max: 1000,
      },
      deadline: Date,
      owner: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Goal = new GoalCollection();
