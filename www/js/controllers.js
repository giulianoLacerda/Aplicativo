angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {


})

.controller('cameraCtrl', function($scope) {

})

.controller('sobreCtrl', function($scope) {

})

.controller('loginCtrl', function($scope,$http,$state) {

  $scope.data = '';
  $scope.error = '';
  $scope.sucessLogin = null;

  /* ------------------------ Envia requisição de login para o servidor ----------------*/
  $scope.signin = function () {
    $scope.error = null;
    $scope.login = document.getElementById("login-input10").value;
    $scope.senha = document.getElementById("login-input11").value;

    if($scope.login === '' || $scope.senha === '')
      $scope.sucessLogin = 1;
    else{
      $scope.sucessLogin = null;
    }

    if(!$scope.sucessLogin) {
      $http.post('http://172.20.75.160:3000/api/auth/signin', {
        username: $scope.login,
        password: $scope.senha
      }).success(function (successResponse) { // Sucesso no login.
        // Salva informações do user.
        $scope.data = successResponse;
        // Leva user para home.
        $state.go('menu.home');
      }).error(function (response) {
        $scope.error = response.message;
      });
    }
  };

  /*--------------------------------------------------------------------------------------*/

  $scope.articles = function() {
    console.log("Tentando conecção");
    $http.get('http://172.20.75.160:3000/api/articles').then(function (successResponse) {
      $scope.data = successResponse;
      console.log($scope.data);
    }, function (errorRepsonse) {
      $scope.error = errorRepsonse;
      console.log($scope.error);
    });}
})
