window.global = {
  SSIS_APP_ID :'53b05a95-79c4-4e22-8233-96133f82822b',
  CONNECT_MODE : 0
}
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ssisapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ssisapp.controllers' is found in controllers.js
angular.module('ssisapp', ['ionic', 'ssisapp.controllers', 'ssisapp.services', 'pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$translateProvider', function($translateProvider){
  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader({
    prefix: 'data/',
    suffix: '.json'
  });
  var lang = JSON.parse(window.localStorage.getItem("ssisapp-lg"));
  if (!lang) {lang = 'vi_VN';window.localStorage.setItem("ssisapp-lg", JSON.stringify(lang));}
    $translateProvider.preferredLanguage(lang);
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/themes/menu.html',
    controller: 'MenuCtrl'
  })
  .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/themes/dashboard.html'
        }
      }
    })
  .state('app.dashlist', {
      url: '/dashboard/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/themes/dashboard-list.html',
          controller: 'DashListCtrl'
        }
      }
    })
  .state('app.feedback', {
      url: '/feedback',
      views: {
        'menuContent': {
          templateUrl: 'templates/themes/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
})

;
