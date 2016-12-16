Meteor.methods({
    'createuser': function(userData) {
        try {
            // check if user already registered
            if(Meteor.users.findOne({username: userData.username})) {
                    throw new Meteor.Error(404, 'Email already registered.');
            }
            // create new user
            else return Accounts.createUser(userData);
        }
        catch(error) {
            throw new Meteor.Error(error.message);
        }
    },
    // set new password with username and new password
    'setNewPassword': function(username, pass) {
        // check if username
        if(username){
            // find user from database
            let user = Accounts.findUserByEmail(username);
            //set password
            return Accounts.setPassword(user._id, pass);
        }

    },
    // generate random string for OTP
    'randomStringGenerator': function() {
        let text = "";
        length = 6;
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
     },
    // sendMail function for sending msg
    'sendEmail': function(to,randomString) {
        this.unblock();
        let subject = 'reset password otp';
        let text = 'your otp is  '+ randomString;
         Email.send({
            to: to,
            from: 'smtp.gmail.com',
            subject: subject,
            text: text
        });
    },
    // update user profile with userData
    'updateUserProfile': function(userId, userData) {
        return Meteor.users.update({_id: userId },{ $set: userData });
    },
    // sendMailForOTP function
    'sendMailForOtp': function (to) {
        // find user
        let userData = Accounts.findUserByEmail(to);
        // call random string generator function
        let randomString = Meteor.call('randomStringGenerator');
        userData.otp = randomString;
        // call sendEmail function
        Meteor.call('sendEmail',to,randomString, function(err, res) {
            if(err) {
                throw new Meteor.Error(err.message);
            }
            else {
                // if email send than update profile
                return Meteor.call('updateUserProfile', userData._id, userData);
            }
        });
    },
    // validate otp
    'validateOTP': function(username, otp) {
        if(username){
            var user = Accounts.findUserByEmail(username);
        }
        if(otp.toUpperCase() == user.otp.toUpperCase()) {
            user.otp = '';
            return Meteor.call('updateUserProfile', user._id, user);
        }
        else {
            throw new Meteor.Error('Incorrect OTP');
        }
    }
});

// if Meteor is server than configure process MAIL URL
if (Meteor.isServer) {
    Meteor.startup(function () {
        process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent('info.samplemail@gmail.com') + ':' +
        encodeURIComponent('samplemail') + '@' +
        encodeURIComponent('smtp.gmail.com') + ':' + '587';
    });
}
