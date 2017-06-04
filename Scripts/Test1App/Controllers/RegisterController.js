angular
    .module('Test1App')
        .controller('RegisterController', function ($scope, UserService) {
            //Default Variable
            $scope.submitText = "Save";
            $scope.submitted = false;
            $scope.message = '';
            $scope.isFormValid = false;
            $scope.User = {
                username: '',
                password: ''
            };
            //Check form Validation // here registerForm is our form name
            $scope.$watch('registerForm.$valid', function (newValue) {
                $scope.isFormValid = newValue;
            });
            //Save Data
            $scope.submitForm = function (data) {
                if ($scope.submitText == 'Save') {
                    $scope.submitted = true;
                    $scope.message = '';

                    if ($scope.isFormValid) {
                        $scope.submitText = 'Please Wait...';
                        $scope.User = data;
                        UserService.AddUser($scope.User).then(function (data) {
                            alert(data.data);
                            if (data.data == 'Success') {
                                //have to clear form here
                                ClearForm();
                            }
                            $scope.submitText = "Save";
                        });
                    }
                    else {
                        $scope.message = 'Please fill required fields value';
                    }
                }
            }
            //Clear Form (reset)
            function ClearForm() {
                $scope.User = {};
                $scope.registerForm.$setPristine(); //here registerForm our form name
                $scope.submitted = false;
            }
        });

