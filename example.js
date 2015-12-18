angular.module('test', ['odontogram']);

var app = angular.module('test');

app.filter('prettify', function() {

  function syntaxHighlight(json) {
     
    if (json === undefined) return "";
    json = JSON.stringify(json, undefined, 4);
    // console.log(json)
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  return syntaxHighlight;
});

app.controller('TestCtrl', function($scope, $log) {

  $scope.myMouth;
  
  $scope.prueba = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};


});
