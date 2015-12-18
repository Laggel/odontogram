var app = angular.module('odontogram');

app.controller('UpdateToothCtrl',function ($scope,$modalInstance,data, Tooth) {
    //Public Variables
    $scope.labels = {
      title: "Pieza No.",
      tooth: "Diente:",
      root: "Raiz",
      crown: "Corona",
      comment: "Comentario"
    };
    $scope.tooth = data.tooth;
    $scope.tooth.init();
    $scope.conventions = data.conventions;
  
    // Public Functions
  
    //- Check if something is selected for the root or the crown
    $scope.disableTooth = function () {
      return !($scope.tooth.root.over == null 
        && $scope.tooth.root.fill == null
        && $scope.tooth.crown.fill == null
        && $scope.tooth.crown.fill == null
        );
    }
    
    //- Check if something is selected for the complete tooth
    $scope.disableToothPart = function (){
      return !($scope.tooth.complete.over == null && $scope.tooth.complete.fill == null);
    } 
    
    //- Set selected convetion to all active faces and disactivate the faces.
    $scope.setConventionToFaces = function(pConvention) {
      var convention = {};
      var flagIsFaceSelected = false;
      //Si al menos hay uno de un color diferente al que estoy seleccionando, 
      // vamos a colorear
      for (var face in $scope.tooth.faces){
        if ($scope.tooth.faces[face].isActive) {
          flagIsFaceSelected = true;
          if ($scope.tooth.faces[face].id != pConvention.id) {
            convention = pConvention;
            break;
          }
        }
      }
      if (flagIsFaceSelected) {
        for (var face in $scope.tooth.faces){
          if ($scope.tooth.faces[face].isActive) {
              // console.log('paint',convention)
              $scope.tooth.faces[face] = angular.copy(convention);
          }
        }
      } else {
        alert('Debe seleccionar al menos una cara.')
      }
    }
    
    //Modal Handling
    $scope.cancel = function(){
			$modalInstance.close();
		};
		
    $scope.done = function(){
			$modalInstance.close($scope.tooth);
		};
});