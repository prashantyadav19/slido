/*
* dashboard directive for sampleApp module
 * this directive use as landing page of logged in user
*/
angular.module('sampleApp')
    .directive('dashboard', ['$state', function($state) {
        return {
            restrict: 'EA',
            templateUrl: 'client/dashboard/dashboard.html',
            controllerAs: 'vm',
            scope: {},
            controller: function($scope, $reactive) {
                $reactive(this).attach($scope);
                var vm = this;
            }
        };

    }]);
