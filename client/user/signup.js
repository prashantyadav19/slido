/**
 * signup directive for sampleApp module
 * this directive use for registering new users
 */
angular.module("sampleApp").directive("signup", ["$toastr", "$state", function ($toastr, $state) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'client/user/signup.html',
        scope: {},
        controllerAs: "vm",
        controller: function ($scope, $reactive) {

            // Attach $scope to this object
            $reactive(this).attach($scope);

            // variables
            var vm = this;
            var userData;

            /*
             * signup function for register new user
             */
            this.signup = function () {

                // check if confirm password match with password
                if (vm.newUser.confirmPassword != vm.newUser.password)
                    return $toastr.error("Passwords do not match.");

                // check if email address not exist
                if (!vm.newUser.emails[0].address)
                    return $toastr.error("Invalid email Address.");

                // asign email to username
                vm.newUser.username = vm.newUser.emails[0].address;

                // crete userData object for create method
                userData = {
                    username: vm.newUser.username,
                    email: vm.newUser.emails[0].address,
                    password: vm.newUser.password,
                    profile: {
                        name: vm.newUser.profile.name
                    }
                };
                // call create user method and pass userData object to this method
                Meteor.call('createuser', userData, (err, res) => {
                    // check if error
                    if (err) {
                        // check if email already registered
                        if (err.message == '[Email already registered.]') {
                            $toastr.error('Email already registered.');
                        }
                        else $toastr.error('User cannot be created - ' + err.message);

                    }
                    else {
                        $toastr.success('Successfully Registered');

                        // if user successfully created than login
                        Meteor.loginWithPassword(this.newUser.username, this.newUser.password, (err) => {

                            // check if successfully login than redirect to dashboard
                            if (!err)
                                $state.go('dashboard');
                        });
                    }
                });
            };
        }
    }
}]);
