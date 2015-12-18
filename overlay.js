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
