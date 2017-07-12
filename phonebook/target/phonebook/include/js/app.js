(function() {

    var app = angular.module("ContactsApp", []);

    app.controller("HttpCtrl", function ($scope, $http) {
        $scope.navTitle = 'All Contacts';
        $scope.operation = "";
        $scope.isSaveDisabled = true;
        $scope.isDeleteDisabled = true;

        var response = $http.get('/rest/contacts/all');
        response.success(function (data) {
            $scope.contacts = data;
            console.log("[main] # of items: " + data.length);
            angular.forEach(data, function (element) {
                console.log("[main] contact: " + element.name);
            });
        });
        response.error(function (data, status, headers, config) {
            alert("AJAX failed to get data, status=" + status);
        });


        $scope.getContact = function (id) {
            var response = $http.get('/rest/contacts/' + id);

            response.success(function (data) {
                console.log("getContact data: " + angular.toJson(data, false));
                $scope.contact = data;
                $scope.operation = "update";
                $scope.isSaveDisabled = false;
                $scope.isDeleteDisabled = false;
            });

            response.error(function (data, status, headers, config) {
                alert("AJAX failed to get data, status=" + status);
            })
        };
        /*
         $scope.searchContact = function(name) {
         $scope.navTitle = 'Search Criteria';

         var response = $http.get(
         '/RestfulWebServiceExample/rest/contacts/search/' + name);
         response.success(function(data) {
         $scope.contacts = data;
         $scope.$apply();

         console.log("[searchContact] # of items: " + data.length)
         angular.forEach(data, function(element) {
         console.log("[searchContact] contact: " + element.name);
         });

         });

         response.error(function(data, status, headers, config) {
         alert("AJAX failed to get data, status=" + status);
         })
         };
         */
        $scope.clearForm = function () {
            $scope.contact = {
                id: '',
                name: '',
                surname: '',
                number: '',
                email: ''
            };
        };

        $scope.addNew = function (element) {
            $scope.operation = "create";
            $scope.clearForm();
            main.name.focus();
            $scope.isSaveDisabled = false;
            $scope.isDeleteDisabled = true;
        };

        $scope.saveContact = function (id) {
            $scope.jsonObj = angular.toJson($scope.contact, false);
            console.log("[update] data: " + $scope.jsonObj);
            /*
             if ($scope.operation == "update") {
             var response = $http.put('/rest/contacts/all'
             + id, $scope.jsonObj);birthName
             response.success(function(data, status) {
             console.log("Inside update operation..."
             + angular.toJson(data, false) + ", status=" + status);
             $scope.resetSearch();
             });

             response.error(function(data, status) {
             alert("AJAX failed to get data, status=" + status);
             })
             } else if ($scope.operation == "create") {
             */
            var response = $http.post('/rest/contacts/all/add',
                $scope.jsonObj);
            response.success(function (data, status) {
                console.log("Inside create operation..."
                    + angular.toJson(data, false) + ", status=" + status);
                $scope.resetSearch();
            });

            response.error(function (data, status) {
                alert("AJAX failed to get data, status=" + status, scope);
            });
        };
        /*
         $scope.deleteContact = function(id) {
         var response = $http.delete(
         '/RestfulWebServiceExample/rest/contacts/' + id);
         response.success(function(data, status) {
         console.log("Inside delete operation..."
         + angular.toJson(data, false) + ", status=" + status);
         $scope.resetSearch();
         });

         response.error(function(data, status) {
         alert("AJAX failed to get data, status=" + status);
         })
         };

         $scope.resetSearch = function(name) {
         $scope.operation="";
         $scope.clearForm();
         $scope.isSaveDisabled = true;
         $scope.isDeleteDisabled = true;
         $scope.navTitle = 'All Stars';
         $scope.searchName = '';

         var response = $http.get('/RestfulWebServiceExample/rest/contacts/');
         response.success(function(data) {
         $scope.contats = data;
         //$scope.$apply();
         console.log("[resetSearch] # of items: " + data.length)
         });

         response.error(function(data, status, headers, config) {
         alert("AJAX failed to get data, status=" + status);
         })
         };*/
        // });
    })();
});