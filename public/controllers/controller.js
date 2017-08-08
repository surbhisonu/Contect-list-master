var app = angular.module('contctApp', []);

app.controller('AppCtrl', function($scope,$http) {
  var refresh = function()
  {
    $http.get('/contactlist').then(successCallback, errorCallback);
        function successCallback(response){
          $scope.contactlist  = response.data;
        //  $scope.contact = "";
        }
        function errorCallback(error){
          alert("somting wrong");
        }
    };
refresh();
$scope.addContact = function() {
  $http.post('/contactlist', $scope.contact).then(successCallback, errorCallback);
      function successCallback(response){
        $scope.contactlist  = response.data;
        refresh();
      }
      function errorCallback(error){
        alert("somting wrong");
      }
  }

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).then(successCallback, errorCallback);
  function successCallback(response){
  refresh();
  }
  function errorCallback(error){
    alert("somting wrong");
  }
}

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/'+id).then(successCallback, errorCallback);
  function successCallback(response){
  $scope.contact = response.data;
  }
  function errorCallback(error){
    alert("somting wrong");
  }
}

$scope.update = function() {
  $http.put('/contactlist/'+$scope.contact._id, $scope.contact).then(successCallback, errorCallback);
  function successCallback(response){
  refresh();
  }
  function errorCallback(error){
    alert("somting wrong");
  }
}

});
