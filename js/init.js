/**
 *
 *
 */

require(['@jquery', '@ng', 'ng_ctlr']
.concat(['@ng-route', '@ng-resource']), 
function($, ng, ng_ctlr){    
    if (location.hostname == 'localhost') {
        // inject livereload
        $('head').append($('<script src="http://' + location.hostname + ':35729/livereload.js"></script>'));
    }

    // we rely on the js hoister feature to code this way.
    app_defn.$inject = ['$routeProvider', '$locationProvider'];
    function app_defn ($routeProvider, $locationProvider) {
        $routeProvider.when(
            '/eula/', {
                templateUrl: 'tpl/eula.htm',
                controller: 'EulaCtlr',
        }).when(
            '/poll/:d?', {
                templateUrl: 'tpl/poll.htm',
                controller: 'PollCtlr',
        }).when(
            '/', {
                templateUrl: 'tpl/welcome.htm',
                controller: 'WelcomeCtlr',
        }).otherwise({
          redirectTo: '/#!/',
        });

        $locationProvider.html5Mode(false).hashPrefix('!');
    }
    var module = ng.module('headless-poller', ['ngRoute', 'ngResource'], app_defn);

    // Load Models
    // ng_svc(module);
    // ng_model(module);
    ng_ctlr(module);
    // ng_dir(module);

    ng.bootstrap(document, ['headless-poller']);
}); 
