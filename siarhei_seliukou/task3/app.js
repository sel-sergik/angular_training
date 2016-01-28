var loginApp = angular.module('loginApp', [
  'ngRoute'
]);

loginApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      }).
      when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotController'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);