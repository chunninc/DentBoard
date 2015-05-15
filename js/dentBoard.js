angular.module('dentBoardApp', [])
  .controller('FormController', ['$http', '$scope', function($http, $scope) {
    $http.defaults.useXDomain = true;
    $scope.result = [];
    $scope.start = true;
    $scope.cont = [];
    $scope.error = "";
    $scope.submit = function() {
      $scope.start = false;
      $scope.attribute_list = [];
      $scope.cont = [];
      $scope.err = "";
      $scope.url_string = "http://www.bloomapi.com/api/search/npi?callback=JSON_CALLBACK&key1=credential&op1=eq&value1=DMD";
      
      if ($scope.myform.zip_code) {
        $scope.attribute_list.push({key: "practice_address.zip", value: this.myform.zip_code});
        $scope.cont.push("Zip Code: " + this.myform.zip_code); 
      }
      if ($scope.myform.last_name) {
        $scope.attribute_list.push({key: "last_name", value: this.myform.last_name.toUpperCase()});
        $scope.cont.push("Last Name: " + this.myform.last_name.toUpperCase());
      }

      if ($scope.myform.first_name) {
        $scope.attribute_list.push({key: "first_name", value: this.myform.first_name.toUpperCase()});
        $scope.cont.push("First Name: " + this.myform.first_name.toUpperCase());
      }

      if ($scope.myform.state) {
        $scope.attribute_list.push({key: "practice_address.state", value: this.myform.state});        
        $scope.cont.push("State: " + this.myform.state);
      }

      if ($scope.myform.city) {
        $scope.attribute_list.push({key: "practice_address.city", value: this.myform.city.toUpperCase()});
        $scope.cont.push("City: " + this.myform.city.toUpperCase());
      }

      if ($scope.myform.gender) {
        $scope.attribute_list.push({key: "gender", value: this.myform.gender});
        $scope.cont.push("Gender: " + this.myform.gender.toUpperCase());
      }

      if ($scope.myform.npi) {
        $scope.attribute_list.push({key: "npi", value: this.myform.npi});
        $scope.cont.push("NPI Number: " + this.myform.npi);
      }
      for(var key in $scope.myform){
        $scope.myform[key] = '';
      }
      for(var i=0; i<$scope.attribute_list.length; i++){
        var tmp = i+2;
        $scope.url_string += "&key" + tmp + "=" + $scope.attribute_list[i].key;
        $scope.url_string += "&op" + tmp + "=eq";
        $scope.url_string += "&value" + tmp + "=" + $scope.attribute_list[i].value;
      }
      console.log($scope.url_string);
      $http.jsonp($scope.url_string)
        .success(function(data, status) {
          //$scope.result = data;
          $scope.result = data.result;
          //console.log(data);
      })
        .error(function(data, status) {
          $scope.err += status + " error";
        });

    };

  }]);