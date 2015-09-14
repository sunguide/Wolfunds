'use strict';

/* Controllers */
var API_BASE_URL = 'http://wolfunds.aiai.im';
function HomeCtrl($scope, $routeParams,$cookieStore) {
    $scope.currentUserName = $cookieStore.get("username");
    $scope.phoneId = $routeParams.phoneId;
}
function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}


function zhCtrl($scope,$http){
    $scope.stocks = [];
    $scope.stocks_canvas_data = [];
    var API_URL = API_BASE_URL+"/Stock/combination";
    $http({
        method  : 'POST',
        url     : API_URL,
        data    : $scope.formData,  // pass in data as strings
        headers : {'Content-type':"application/json"}  // set the headers so angular passing info as form data (not request payload)
    }).success(function(data) {
        if ('FAIL' == data.status.toString()) {
            // if not successful, bind errors to error variables
            remind(data.errors[0]['error'],"","error")
        } else {

            $scope.stocks = data.result;
            var colors = ["#637b85","#2c9c69","#dbba34","#c62f29"];
            $scope.stocks.forEach(function(e,index){
                $scope.stocks_canvas_data.push({value: e.rate,color: colors[index]});
            });
            $(window).resize();
            console.log($scope.stocks_canvas_data);
        }
    });

}
function LoginCtrl($scope,$http,$location,$cookieStore){
    $scope.formData = {};
    $scope.callAPI = function() {
        var API_URL = API_BASE_URL+"/User/login";
        console.log($scope.formData);
        $http({
            method  : 'POST',
            url     : API_URL,
            data    : $scope.formData,  // pass in data as strings
            headers : {'Content-type':"application/json"}  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
            console.log(data);
            if ('FAIL' == data.status.toString()) {
                // if not successful, bind errors to error variables
                remind(data.errors[0]['error'],"","error")
            } else {
                // if successful, bind success message to message
                $scope.currentUser = data.result.uid?data.result.uid:"";
                $scope.currentUserName = data.result.username?data.result.username:"";
                $cookieStore.put('uid',$scope.currentUser);
                $cookieStore.put('username',$scope.currentUserName);
                $location.path('/');
            }
        });
    };
}
function LogoutCtrl($location,$cookieStore){
    $cookieStore.put('username',"");
    $cookieStore.put('uid',"");
    $location.path('/');
}
function RegCtrl($scope,$http,$location,$cookieStore){
    $scope.formData = {};
    $scope.callAPI = function() {
        var API_URL = "http://wolfunds.aiai.im/User/reg";
        console.log($scope.formData);
        $http({
            method  : 'POST',
            url     : API_URL,
            data    : $scope.formData,  // pass in data as strings
            headers : {"Content-type":"application/json"}  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
            console.log("success:");
            console.log(data);
            if ("FAIL" == data.status ) {
                remind(data.errors[0]['error'],"","error")
            } else {
                $scope.currentUser = data.result.uid?data.result.uid:"";
                $scope.currentUserName = data.result.username?data.result.username:"";
                $cookieStore.put('uid',$scope.currentUser);
                $cookieStore.put('username',$scope.currentUserName);
                $location.path('/');
            }
        }).error(function(data){
            console.log("error:");
            console.log(data);
            remind(data.errors[0]['error'],"","error")
        });
    };
}

MyCtrl2.$inject = [];

function navCtrl($scope,$location,$cookieStore){
    $scope.currentUser = $cookieStore.get("uid");
    $scope.currentUserName = $cookieStore.get("username");
    console.log("username:"+$scope.currentUserName);

    $scope.logout = function(){
        $cookieStore.put('username',"");
        $cookieStore.put('uid',"");
        $scope.currentUser = 0;
        $scope.currentUserName = '';
        $location.path('/');
    }
}
function PhoneListCtrl($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
}