angular
    .module('Test1App')
        .service('UserService', function ($http, $q) {
            this.AddUser = function (User) {
                var defer = $q.defer();
                $http({
                    url: '/User/AddUser',
                    method: 'POST',
                    data: JSON.stringify(User)
                }).then(function (successData) {
                    defer.resolve(successData);
                },function (errorData) {
                    defer.reject(errorData);
                });
                return defer.promise;
            }
            
            this.Login = function (UserData) {
                var defer = $q.defer();
                $http({
                    url: '/User/Login',
                    method: 'POST',
                    data: JSON.stringify(UserData)
                }).then(function (successData) {
                    defer.resolve(successData);
                }, function (errorData) {
                    defer.reject(errorData);
                });
                return defer.promise;
            }
        });