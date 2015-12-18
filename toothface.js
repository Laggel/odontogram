var app = angular.module('odontogram');

app.directive('toothface', function () {
  return {
    restrict: 'A',
    scope: {
      'ngModel': '=',
      'title': '='
    },
    templateUrl: 'toothface.html',
    controller: function ($scope) {
      $scope.toogleActive = function () {
        $scope.ngModel.isActive = !$scope.ngModel.isActive;
      }
    }
  };
});