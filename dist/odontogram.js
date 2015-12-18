var app = angular.module('odontogram', ['ui.bootstrap','ngSanitize','dialogs.main']);

app.factory('Tooth', function () {
  
  function Tooth(id) {
    this.id = id;
  }
  
  Tooth.prototype.init = function(){
    
    var empty = {complete : {},
    root : {},
    crown : {},
    
    faces :{
      buccal:{},
  	  lingual:{},
  	  messial:{},
  	  occlusal:{},
  	  distal:{}
    }
      
    }
    _.defaults(this,empty)
  }
  return Tooth;

});
app.factory('Mouth', function (Tooth) {
  
  function Mouth(obj,child) {
    if (obj === null || obj === undefined) {
      this.create(child);
    } else {
      angular.extend(this,obj);
    }
  }
  
  Mouth.prototype.create = function (child) {
    
    this.quadrant1 = [];
    this.quadrant2 = [];
    this.quadrant3 = [];
    this.quadrant4 = [];
    
    //Adults
    for(var i=1; i<=8; i++) {
      var tooth1 = new Tooth(19-i);
      this.quadrant1.push(tooth1);
      
      var tooth2 = new Tooth(20+i);
      this.quadrant2.push(tooth2);
      
      var tooth3 = new Tooth(39-i);
      this.quadrant3.push(tooth3);
      
      var tooth4 = new Tooth(40+i);
      this.quadrant4.push(tooth4);
    }
    
    if (child) {
      this.quadrant5 = [];
      this.quadrant6 = [];
      this.quadrant7 = [];
      this.quadrant8 = [];
      
      //Children
      for (var i=1; i<=5; i++) {
        var tooth1 = new Tooth(50+i);
        this.quadrant5.push(tooth1);
        
        var tooth2 = new Tooth(60+i);
        this.quadrant6.push(tooth2);
        
        var tooth3 = new Tooth(70+i);
        this.quadrant7.push(tooth3);
        
        var tooth4 = new Tooth(70+i);
        this.quadrant8.push(tooth4);
      }
    }
    
    
    
  }
  
  return Mouth;

});
app.factory('Log', function () {
  
  function Log() {
    this.logStorage = [];
  }
  Log.prototype.add = function(tooth){
    this.logStorage = _.reject(this.logStorage, 
        function(logEntry){ 
          return logEntry.tooth == tooth.id; 
        }); 
        
    for (var key in tooth){
      if (key != 'id') {
        
        for (var shapeType in tooth[key]) {
          var obj = {};
          // $log.debug(obj,key,shapeType)
          obj.date = new Date();
          obj.tooth = tooth.id;
          obj.part = key;
          obj.convention = tooth[key][shapeType].description;
          obj.comment = tooth.comment;
          
          this.logStorage.push(obj);
        }
      }
    }
  }
  return Log;

});
app.constant('conventions', [{"id":1,"description":"Exodoncia Realizada","picture":"http://i.imgur.com/7Qo3ARy.png","shape":"icon-pipe","shapeType":"over","color":"blue","order":1,"part":"complete"},
{"id":2,"description":"Exodoncia Simple Indicada","picture":"http://i.imgur.com/BOE2HwD.png","shape":"icon-cross","shapeType":"over","color":"red","order":2,"part":"complete"},
{"id":3,"description":"Exodoncia quirurgica ind.","picture":"http://i.imgur.com/BOE2HwD.png","shape":"icon-asterisk","shapeType":"over","color":"red","order":3,"part":"complete"},
{"id":4,"description":"Sin erupcionar","picture":"http://i.imgur.com/BOE2HwD.png","shape":"icon-dash","shapeType":"over","color":"red","order":4,"part":"complete"},
{"id":5,"description":"Sellante presente","picture":"","shape":"icon-s","shapeType":"over","color":"blue","order":5,"part":"complete"},
{"id":6,"description":"Sellante indicado","picture":"","shape":"icon-s","shapeType":"over","color":"red","order":6,"part":"complete"},
{"id":7,"description":"Procedimiento realizado","picture":"http://i.imgur.com/XjoGmkm.png","shape":"icon-check","shapeType":"over","color":"blue","order":7,"part":"complete"},
{"id":8,"description":"Endodoncia realizada","picture":"http://i.imgur.com/yEN57HT.png","shape":"icon-triangle","shapeType":"fill","color":"blue","order":8,"part":"root"},
{"id":9,"description":"Endodoncia indicada","picture":"http://i.imgur.com/549Xmv8.png","shape":"icon-triangle","shapeType":"fill","color":"red","order":9,"part":"root"},
{"id":10,"description":"Erocion o ebrasion","picture":"http://i.imgur.com/FHkgGDG.png","shape":"icon-arc","shapeType":"over","color":"red","order":10,"part":"root"},
{"id":11,"description":"Procedimiento realizado","picture":"http://i.imgur.com/XjoGmkm.png","shape":"icon-check","shapeType":"over","color":"blue","order":11,"part":"root"},
{"id":12,"description":"Nucleo mal estado","picture":"http://i.imgur.com/VtkbX6l.png","shape":"icon-n","shapeType":"fill","color":"red","order":12,"part":"root"},
{"id":13,"description":"Nucleo buen estado","picture":"http://i.imgur.com/MzASrxJ.png","shape":"icon-n","shapeType":"fill","color":"blue","order":13,"part":"root"},
{"id":14,"description":"Implante","picture":"http://i.imgur.com/a3M3Oks.png","shape":"opacity","shapeType":"over","color":"gray","order":14,"part":"root"},
{"id":15,"description":"Pontico","picture":"http://i.imgur.com/JVPonuQ.png","shape":"opacity","shapeType":"fill","color":"gray","order":15,"part":"root"},
{"id":16,"description":"Corona buen estado","picture":"http://i.imgur.com/yEN57HT.png","shape":"icon-circle","shapeType":"fill","color":"blue","order":16,"part":"crown"},
{"id":17,"description":"Corona mal estado","picture":"http://i.imgur.com/549Xmv8.png","shape":"icon-circle","shapeType":"fill","color":"red","order":17,"part":"crown"},
{"id":18,"description":"Provisional buen estado","picture":"http://i.imgur.com/MzASrxJ.png","shape":"icon-p","shapeType":"fill","color":"blue","order":18,"part":"crown"},
{"id":19,"description":"Provisional mal estado","picture":"http://i.imgur.com/VtkbX6l.png","shape":"icon-p","shapeType":"fill","color":"red","order":19,"part":"crown"},
{"id":20,"description":"Cariado","picture":"http://i.imgur.com/MkpYTGQ.png","shape":"icon-square","shapeType":"fill","color":"red","order":20,"part":"face"},
{"id":21,"description":"Obturado","picture":"http://i.imgur.com/RFqayvh.png","shape":"icon-square","shapeType":"fill","color":"blue","order":21,"part":"face"}])

app.directive('mouth', function () {
  return {
    restrict: 'E',
    scope: {
      'mouth': '=ngModel',
      'child': '=',
      'log':'='
    },
    templateUrl: 'mouth.html',
    controller: function ($scope, Mouth, Log, conventions, dialogs, $log) {
      //Public Variables
      var myLog = new Log();
      $scope.log = myLog.logStorage;
      $scope.mouth = new Mouth($scope.mouth,$scope.child);
      
      //Private Function
      var deepIteration = function(obj) {
        for (var key in obj) {
          if (obj[key] === null || obj[key] === undefined || JSON.stringify(obj[key]) === "{}"){ 
            $log.debug(obj,key);
            delete obj[key];
            $log.debug(obj);
          } else if (_.isObject(obj[key])){
            obj[key] = deepIteration(obj[key]);
            
            if (obj[key] === null || obj[key] === undefined || JSON.stringify(obj[key]) === "{}"){ 
              $log.debug(obj,key);
              delete obj[key];
              $log.debug(obj);
            }
          }
        }
        return obj;
      }
      
      //Public Functions;
      
      $scope.updateTooth = function (currentTooth) {
        var dialog = dialogs.create(
          'updateTooth.html',
          'UpdateToothCtrl',
          { tooth:  currentTooth, 
          conventions: conventionsByPart},
          {size:'lg', 
          animation:true});
          
  			dialog.result.then(function(_tooth){
  			  if (_tooth){
  			    
  			    _.extend(currentTooth , _tooth) 
  			    
  			    $log.debug(currentTooth);
  			    //currentTooth = JSON.parse(JSON.stringify(currentTooth))
  			    //Delete empty objects 
    			  currentTooth = deepIteration(currentTooth);
    			  
    			  $log.debug(currentTooth);
  			    myLog.add(currentTooth);
  			    $scope.log = myLog.logStorage;
    			  $log.debug(myLog);
    			  //Assign fill objects to _tooth
    			  //In order not to loose memory reference
    			  
  			  }
  				
  			},function(data){
  				$log.error(data);
  			});
      };
      
      //TODO: Business logic with conventions
      
      //Group by Part
      var conventionsByPart = _
      .chain(conventions)
      .groupBy("part")
      .mapObject(function(value,key){
        return _.groupBy(value, "shapeType"); 
      })
      .mapObject(function (part,key){
        return _.mapObject(part,function(shapeType,key){
          return _.map(shapeType, function(convention) {
            return {
                id: convention.id,
                description: convention.description,
                picture: convention.picture,
                color: convention.color
            };
          });
        });
      })
      .value();
      $scope.conventions = conventionsByPart;
      
      /*
      Version Legible
      var conventionsByPart = _.groupBy(conventions, function(convention){ 
        return convention.part; 
      });
      
      $log.debug(conventionsByPart);
      
      //Group by ShapeType
      for (var part in conventionsByPart) {
        conventionsByPart[part] =  _.groupBy(conventionsByPart[part], function(convention){ 
          return convention.shapeType; 
        })
      }
      
      conventionsByPart = _.mapObject(conventionsByPart,function (part,key){
        return _.mapObject(part,function(shapeType,key){
          return _.map(shapeType, function(convention) {
            return {
                id: convention.id,
                description: convention.description,
                picture: convention.picture,
                color: convention.color
            };
          });
        })
      });
      */
      
      
    }
  };
});
var app = angular.module('odontogram');

app.directive("drawing", function(){
  return {
    restrict: "A",
    scope: {
      'base': '=',
      'fill': '=',
      'over': '='
    },
    link: function(scope, element){
      var canvas_context = element[0].getContext('2d');
      
      var img = new Image();
      img.onload = function() {
        
        //Si hay algo que poner sobre 
        if (scope.over) {
          var over = new Image();
          over.onload = function() {
            
            var base = new Image();
            base.onload = function() {
                canvas_context.clearRect(0, 0, element[0].width, element[0].height);
                
                canvas_context.drawImage(img, 0, 0);
                canvas_context.globalCompositeOperation = "destination-in";
                
                canvas_context.drawImage(base, 0, 0);
                canvas_context.globalCompositeOperation = "source-over";
                
                canvas_context.drawImage(over, 0, 0);
                canvas_context.globalCompositeOperation = "source-over";
                
            };
            base.src = scope.base;
          } 
          over.src =scope.over;
        } else {
          var base = new Image();
            base.onload = function() {
                canvas_context.clearRect(0, 0, element[0].width, element[0].height);
                
                canvas_context.drawImage(img, 0, 0);
                canvas_context.globalCompositeOperation = "destination-in";
                
                canvas_context.drawImage(base, 0, 0);
                canvas_context.globalCompositeOperation = "source-over";
            };
            base.src = scope.base;
        }
      }
      img.src =scope.fill;
      
      scope.$watch('fill',function (data){
        img.src = scope.fill || scope.base;
      });
      
      scope.$watch('over',function (data){
        img.src = scope.fill || scope.base;
      });
      
    }
  };
});

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