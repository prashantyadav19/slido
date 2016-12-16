angular.module('sampleApp').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
         .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('signup', {
            url: '/signup',
            template: '<signup></signup>'
        })
       .state('dashboard', {
            url: '/dashboard',
            template: '<dashboard></dashboard>'
        });

    $urlRouterProvider.otherwise("/login");
});
