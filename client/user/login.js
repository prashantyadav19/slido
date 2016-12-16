/*
 * login directive for sampleApp module
 * this directive use for login
 */
angular.module('sampleApp')
    .directive('login', ['$toastr', '$state', function ($toastr, $state) {
        return {
            restrict: 'EA',
            templateUrl: 'client/user/login.html',
            scope: {},
            controllerAs: "vm",
            controller: function ($scope, $reactive) {
                // attach $scope to this object
                $reactive(this).attach($scope);
                // variables
                var vm = this;
                vm.forgetPassword = true;
                vm.loding = false;

                /*
                 *  vm.login function
                 */
                vm.login = () => {
                    if (vm.username) {
                        Meteor.loginWithPassword(vm.username, vm.password, (err) => {
                            if (err) {
                                $toastr.error("Invalid username or password.");
                            } else {
                                $toastr.success('Successfully Logged In');
                                $state.go('dashboard');
                                vm.username = '';
                                vm.password = '';
                            }
                        })
                    } else {
                        $toastr.error("Invalid username.");
                    }
                };

                /*
                 * forgot password function for UI view
                 */
                vm.forgotPassword = () => {
                    vm.forgetPassword = false;
                };


                /**
                 * sendOtp method
                 * this method use for sending otp.
                 * @param to compulsory
                 */
                vm.sendOtp = (to) => {
                    //check if mail to not set
                    if (!to) {
                        $toastr.error("please enter email");
                        return false;
                    }
                    vm.loding = true;
                    Meteor.call("sendMailForOtp", to, (error, result) => {
                        if (error) {
                            $toastr.error("mail sending fail");
                            vm.loding = false;
                        } else {
                            $toastr.success("mail successfully send");
                            $("#enterOtpModal").modal();
                            vm.loding = false;
                            vm.userEmail = to;
                        }
                    });
                }

                /**
                 * verifyOtp method
                 * this method use for verify otp.
                 * @param otp compulsory
                 */
                vm.verifyOtp = (otp)=> {
                    Meteor.call('validateOTP', vm.userEmail, otp, (err, res) => {
                        if (err) {
                            $toastr.error("Incorrect OTP.");
                            vm.otp = '';
                        }
                        else {
                            $("#resetPasswordModal").modal();

                        }
                    });
                };


                /**
                 * vm.resetNewPassword method
                 * this method use for reset new password.
                 * @param newPassword compulsory
                 * @param confirmNewPassword compulsory
                 */
                vm.resetNewPassword = (newPassword, confirmNewPassword)=> {
                    if (!newPassword) {
                        $toastr.error("Enter new Password.");
                        return false;
                    }
                    else if (!confirmNewPassword) {
                        $toastr.error("Re-enter Password.");
                        return false;
                    }
                    else if (newPassword != confirmNewPassword) {
                        $toastr.error("password not match.");
                        return false;
                    }

                    this.call('setNewPassword', vm.userEmail, newPassword, (err, res) => {
                        if (err) {
                            $toastr.error(err);
                        }
                        else {
                            $('#resetPasswordModal').modal('hide');
                            $('.modal-backdrop').remove();
                            $toastr.success("Password has been reset.");
                            // if password reset successfully than user logged in
                            Meteor.loginWithPassword(vm.userEmail, newPassword, (err) => {
                                if (err) {
                                    this.password = '';
                                }
                                else {
                                    this.password = '';
                                    $state.go('dashboard');
                                }
                            })
                        }
                    })
                };

                // method use for back to login screen from forgot password screen
                vm.backToLogin = ()=> {
                    vm.forgetPassword = true;
                }
            }
        }
    }]);