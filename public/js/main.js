

var edit = angular.module('edit', []);

edit.controller('SearchCtrl', ['$scope', '$http', '$sce', SearchCtrl]);

function SearchCtrl($scope, $http, $sce) {
    $scope.data = '123';
    
    $scope.currentId = 0;
    
    $scope.current = null;
    
    $scope.$watch('query', function (newValue, oldValue) {
        if (newValue == '')
            return;
            
        $scope.search(newValue);
    });
    
    $scope.$watch('currentId', function (newValue, oldValue) {
        $scope.current = $scope.findById(newValue);
        
        if ($scope.current == null)
            return;
        
        if (typeof $scope.current.diff === 'string') {
            $scope.current.diff = JSON.parse($scope.current.diff);
        }
        
        $scope.content = $scope.getContent();
    });
    
    $scope.search = function (value) {
        $http({
            url: '/search',
            method: 'GET',
            params: {
                pattern: value
            }
        })
        .then(function (res) {
            $scope.data = res.data;
        });
    };
    
    $scope.findById = function (id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id)
                return this.data[i];
        }
        
        return null;
    };
    
    $scope.getContent = function () {
        if ($scope.current == null)
            return '123';
        var diff = $scope.current.diff;
        
        var display = document.createElement('pre');
        
        diff.forEach(function(part){
          // green for additions, red for deletions 
          // grey for common parts 
          var color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
          var span = document.createElement('span');
          span.style.backgroundColor = color;
          span.classList.add('blink');
          span.innerHTML += part.value;
          display.appendChild(span);
        });
        
        return $sce.trustAsHtml(display.innerHTML);
    };
    
    $scope.query = 'se';
}
