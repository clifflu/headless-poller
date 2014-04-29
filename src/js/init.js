/**
 *
 *
 */

require(['@jquery', '@aws', '@ng', 'ng_ctlr', 'ng_svc',
    '@ng-route', '@ng-resource', '@ng-cookies', 'conf'], 
function($, AWS, ng, ng_ctlr, ng_svc){    
    if (location.hostname == 'localhost') {
        // inject livereload
        $('head').append($('<script src="http://' + location.hostname + ':35729/livereload.js"></script>'));
    }

    // we rely on the js hoister feature to code this way.
    app_defn.$inject = ['$routeProvider', '$locationProvider'];
    function app_defn ($routeProvider, $locationProvider) {
        $routeProvider.when(
            '/login/', {
                templateUrl: 'tpl/login.htm',
                controller: 'LoginCtlr',
        }).when(
            '/poll/:d?', {
                templateUrl: 'tpl/poll.htm',
                controller: 'PollCtlr',
        }).when(
            '/revoke/', {
                templateUrl: 'tpl/revoke.htm',
                controller: 'RevokeCtlr',
        }).when(
            '/', {
                templateUrl: 'tpl/welcome.htm',
                controller: 'WelcomeCtlr',
        }).otherwise({
          redirectTo: '/#!/',
        });

        $locationProvider.html5Mode(false).hashPrefix('!');
    }
    var module = ng.module('headless-poller', ['ngRoute', 'ngResource', 'ngCookies'], app_defn);

    ng_svc(module);
    ng_ctlr(module);
    
    // ng_model(module);
    // ng_dir(module);

    ng.bootstrap(document, ['headless-poller']);
}); 
