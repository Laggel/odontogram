var app = angular.module('odontogram');

app.directive('tooth', function () {
  return {
    restrict: 'E',
    scope: {
      'tooth': '=ngModel',
      'update':'&'
    },
    templateUrl: 'tooth.html'
  };
});