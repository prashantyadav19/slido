/**
 * mainCtrl controller for sampleApp module.
 * Functions :
 *   1. vm.logout
 *      we can logout current user from this function
 */
angular.module('sampleApp')
    .controller('mainCtrl', ['$scope', '$reactive', '$toastr', '$state', function ($scope, $reactive, $toastr, $state) {
        // Attach $scope to this object
        $reactive(this).attach($scope);

        //variables
        var vm = this;

        // vm.auto run function for getting logged in user
        vm.autorun(function () {
            vm.loggedInUser = Meteor.user();
        });

        /**
         * vm.logout method
         * this method use for logout logged in user
         */
        vm.logout = function () {
            Meteor.logout(function (err) {
                if (err) $toastr.error('Cannot log out. Please try later.');
                else {
                    $state.go('login');
                }
            });
        };
    }]);

// bootstrapping app
function onReady() {
    angular.bootstrap(document, ['sampleApp'], {
        // strictDi mode use when deploy in production
       // strictDi: true
    });
}
angular.element(document).ready(onReady);