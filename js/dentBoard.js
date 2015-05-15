angular.module('dentBoardApp', [])
  .controller('FormController', ['$http', '$scope', function($http, $scope) {
    $http.defaults.useXDomain = true;
    $scope.result = [];
    $scope.start = true;
    $scope.submit = function() {
      $scope.start = false;
      $scope.attribute_list = [];
      $scope.url_string = "http://www.bloomapi.com/api/search/npi?callback=JSON_CALLBACK&key1=credential&op1=eq&value1=DMD";
      
      if ($scope.zip_code) {
        $scope.attribute_list.push({key: "practice_address.zip", value: this.zip_code});
        $scope.zip_code = '';
      }
      if ($scope.last_name) {
        $scope.attribute_list.push({key: "last_name", value: this.last_name.toUpperCase()});
        $scope.last_name = '';
      }

      if ($scope.first_name) {
        $scope.attribute_list.push({key: "first_name", value: this.first_name.toUpperCase()});
        $scope.first_name = '';
      }

      if ($scope.state) {
        $scope.attribute_list.push({key: "practice_address.state", value: this.state});        
        $scope.state = '';
      }

      if ($scope.city) {
        $scope.attribute_list.push({key: "practice_address.city", value: this.city.toUpperCase()});
        $scope.city = '';
      }

      if ($scope.gender) {
        $scope.attribute_list.push({key: "gender", value: this.gender});
        $scope.gender = '';
      }

      if ($scope.npi) {
        $scope.attribute_list.push({key: "npi", value: this.npi});
        $scope.npi = '';
      }
      /*
      for(var i=0; i<$scope.kind_list.length; i++){
        var tmp = i+2;
        $scope.url_string += "&key" + tmp + "=" + $scope.kind_list[i];
        $scope.url_string += "&op" + tmp + "=eq";
        $scope.url_string += "&value" + tmp + "=" + $scope.value_list[i];
      }
      */
      for(var i=0; i<$scope.attribute_list.length; i++){
        var tmp = i+2;
        $scope.url_string += "&key" + tmp + "=" + $scope.attribute_list[i].key;
        if($scope.attribute_list[i].key === "practice_address.zip")
          $scope.url_string += "&op" + tmp + "=prefix";
        else
          $scope.url_string += "&op" + tmp + "=eq";
        $scope.url_string += "&value" + tmp + "=" + $scope.attribute_list[i].value;
      }

      $http.jsonp($scope.url_string)
        .success(function(data, status) {
          //$scope.result = data;
          $scope.result = data.result;
          console.log(data);
      });

    };

  }]);