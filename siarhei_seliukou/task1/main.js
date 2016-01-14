'use strict';

var guestApp = angular.module('guestApp',[]);
guestApp.controller('GuestController', [ '$scope', GuestController]);

var NAME_REGEXP = /^[А-Я]{1}[а-я]{2,}\.[А-Я]{1}[а-я]{2,}$/;
guestApp.directive('russianName', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (NAME_REGEXP.test(viewValue)) {
          ctrl.$setValidity('rName', true);
        } else {
          ctrl.$setValidity('rName', false);
        }
        return viewValue;
      });
    }
  };
});

var DATE_REGEXP = /^(0[1-9]|[12][0-9]|3[01])[- \\s](0[1-9]|1[012])[- \\s](19|20)\d\d$/;
guestApp.directive('dateFormat', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (DATE_REGEXP.test(viewValue)) {
          ctrl.$setValidity('dFormat', true);
        } else {
          ctrl.$setValidity('dFormat', false);
        }
        return viewValue;
      });
    }
  };
});

function GuestController($scope) {
	$scope.master = {};
 
	$scope.apply = function(user) {
		$scope.master = angular.copy(user);
	};
 
	$scope.user = {};
}