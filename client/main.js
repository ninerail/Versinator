var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  console.log('route provider');
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: true}
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .otherwise({
      redirectTo: '/'
    });
});

//Whenever a route is accessed, before the view is served, we ensure that the user is logged in
myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus();
      console.log('next.access.restricted = ' + next.access.restricted)
      console.log('AuthService.isLoggedin = ' + !AuthService.isLoggedIn())
      if (next.access.restricted &&
          !AuthService.isLoggedIn()) {
        $location.path('/login');
        $route.reload();
      }
  });
});

//MAIN CONTROLLER INCLUDE 



// SEARCH FUNCTION FOR API TEXT DATA FOR VIEW

  // this.getData = function(input){
    var controller = this;
    console.log('book: ' + book.value);
    console.log('chapter: ' + chapter.value);
    console.log('verse: ' + verse.value);
  
  var getBook = function (){
    var book = document.getElementById('book');
    var chapter = document.getElementById('chapter');
    var verse = document.getElementById('verse');
    console.log('http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=' + book.value + '+' + chapter.value + '+' + verse.value)
    // $http({
    //   method: 'get',
    //   url: 'http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=' + book + '+' + chapter + '+' + verse;
    // }).then(
    // //success
    // function(response) {
    //   console.log(response);
    // });
  };
