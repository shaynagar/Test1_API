angular
    .module('Test1App')
        .controller('LoginController', function ($scope, $timeout, $window, UserService) {
            $scope.submitText = 'Save';
            $scope.message = '';
            $scope.isFormValid = false;
            $scope.showHelpMessage = false;
            $scope.UserData = {
                username: '',
                password: ''
            }
            $scope.$watch('loginForm', function (newValue) {
                $scope.isFormValid = newValue;
            });

            $scope.login = function (UserData) {
                if ($scope.submitText == 'Login') {
                    $scope.message = 'Please wait...';
                    $scope.UserData = UserData;
                    UserService.Login($scope.UserData).then(function (data) {
                        $scope.message = data.data;
                        $scope.showHelpMessage = true;
                        $timeout(function () {
                            $scope.showHelpMessage = false;
                        }, 2000)
                        if ($scope.message == 'Success') {
                            $window.location.href = '/';
                        }
                        else {
                            $scope.clearForm();
                        }
                    });
                }
            }

            $scope.clearForm = function () {
                $scope.UserData = {};
                $scope.loginForm.$setPristine();
            }
        });
