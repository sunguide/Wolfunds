'use strict';
//
  // Declare app level module which depends on filters, and services
  var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies', 'LocalStorageModule']);
  app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('wf');
  }]);
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('', {templateUrl: 'partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/reference', {templateUrl: 'partials/reference.html', controller: MyCtrl1});
    $routeProvider.when('/stock_zh', {templateUrl: 'partials/stock_zh.html', controller: zhCtrl});
    $routeProvider.when('/stock_best', {templateUrl: 'partials/stock_best.html', controller: BestCtrl});
    $routeProvider.when('/stock_recommend', {templateUrl: 'partials/stock_recommend.html', controller: MyCtrl1});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl});
    $routeProvider.when('/logout', {templateUrl: 'partials/login.html', controller: LogoutCtrl});
    $routeProvider.when('/reg', {templateUrl: 'partials/reg.html', controller: RegCtrl});
    $routeProvider.otherwise({redirectTo: ''});
  }]);

