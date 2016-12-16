// create empty Schemas object
var Schemas = {};
Schemas.Users = new SimpleSchema({
    username: {             // username
        type: String,
        optional: true
    },
    emails: {              // emails with type array ( in future it contain email and status)
        type: Array,
        optional: true
    },
    "emails.$": {         // object with in array
        type: Object
    },
    'emails.$.address': {
        type: String
    },
    profile: {          // profile object for name  in future it will contain(first name, middle name last name)
        type: Object,
        optional: true
    },
    'profile.name': {  // name with type string
        type: String
    },
    createdAt: {       // auto created when row inserted
        type: Date,
        optional: true
    },
    updatedAt: {       // auto update when row update
        type: Date,
        optional: true
    },
    'otp': {            // otp with type string for forgot password
        type: String,
        optional: true
    },
    services: {         // services object for storing encrypted password using account-password
        type: Object,
        optional: true,
        blackbox: true
    }

});

Meteor.users.attachSchema(Schemas.Users);
