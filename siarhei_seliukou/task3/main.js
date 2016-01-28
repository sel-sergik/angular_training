'use strict';

var authApp = angular.module('authApp',['ngRoute', 'ngCookies']);
authApp.controller('LoginController', [ '$scope', '$http', '$cookies', '$location' , LoginController]);
authApp.controller('ForgotController', [ '$scope', ForgotController]);
authApp.controller('DashboardController', [ '$scope', DashboardController]);

authApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'app/partials/login.html',
				controller: 'LoginController'
			}).
			when('/forgot', {
				templateUrl: 'app/partials/forgot.html',
				controller: 'ForgotController'
			}).
			when('/dashboard', {
				templateUrl: 'app/partials/dashboard.html',
				controller: 'DashboardController'
			}).
			otherwise({
				redirectTo: '/login'
			});
}]);

authApp.directive('showtab', function () {
	return {
		link: function (scope, element, attrs) {
			element.click(function(e) {
				e.preventDefault();
				$(element).tab('show');
			});
		}
	};
});

var NAME_REGEXP = /^[А-Я]{1}[а-я]{2,}\.[А-Я]{1}[а-я]{2,}$/;
authApp.directive('russianName', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.russianName = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}
				if (NAME_REGEXP.test(viewValue)) {
					ctrl.$setValidity('rName', true);
				} else {
					ctrl.$setValidity('rName', false);
				}
				return viewValue;
			};
		}
	};
});

var DATE_REGEXP = /^(0[1-9]|[12][0-9]|3[01])[- \\s](0[1-9]|1[012])[- \\s](19|20)\d\d$/;
authApp.directive('dateFormat', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.dateFormat = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}
				if (DATE_REGEXP.test(viewValue)) {
					ctrl.$setValidity('dFormat', true);
				} else {
					ctrl.$setValidity('dFormat', false);
				}
				return viewValue;
			};
		}
	};
});

function LoginController($scope, $http, $cookies, $location) {
	$scope.signIn = function() {
		// $http.get('registerUsers.json').success(function(data) {
		//   $scope.listUsers = data;
		// });
		$http({
			url: 'registerUsers.json',
			method: 'GET',
			transformResponse: appendTransform($http.defaults.transformResponse, function(data) {
				$scope.listUsers = data;
			})
		});

		_.forEach($scope.listUsers, function(curUser) {
			if (curUser.login == $scope.user.login && curUser.password == $scope.user.password){
				$cookies.put("user-login", $scope.user.login);
				$location.path("/dashboard");
			}
		});
	};
 
	$scope.user = {};
}

function ForgotController($scope) {

}
function DashboardController($scope) {

}

function appendTransform(defaults, transform) {
	defaults = angular.isArray(defaults) ? defaults : [defaults];
	return defaults.concat(transform);
}