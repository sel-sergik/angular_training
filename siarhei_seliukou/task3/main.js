'use strict';

var authApp = angular.module('apps',['ui.router', 'ngCookies', 'pascalprecht.translate']);

authApp
.config(function($stateProvider, $urlRouterProvider) {

	// For any unmatched url, redirect to /login
	$urlRouterProvider.otherwise("/login");
	//
	// Now set up the states
	$stateProvider
		.state('login', {
			url: "/login",
			templateUrl: "app/partials/login.html",
			controller: 'LoginController'
		})
		.state('logout', {
			url: "/logout",
			controller: 'LogoutController'
		})
		.state('forgot', {
			url: "/forgot",
			templateUrl: "app/partials/forgot.html",
			controller: 'ForgotController'
		})
		.state('dashboard', {
			abstract: true,
			url: "/dashboard",
			templateUrl: "app/partials/dashboard.html",
			controller: 'DashboardController'
		})
		.state('dashboard.show', {
				// url will become '/dashboard/show'
				url: '/show',
				templateUrl: "app/partials/dashboard.show.html",
		})
		.state('dashboard.edit', {
				// url will become '/dashboard/edit'
				url: '/edit',
				templateUrl: "app/partials/dashboard.edit.html",
		});
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

function appendTransform(defaults, transform) {
	defaults = angular.isArray(defaults) ? defaults : [defaults];
	return defaults.concat(transform);
}