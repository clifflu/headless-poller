define(['@jquery', 'ngc_poll'], 
function($, ngc_poll){
    return function(module) {

        MainCtlr.$inject = ['$rootScope', '$scope', '$location', '$route'];
        function MainCtlr($rs, $scope, $location, $route) {
            $scope._name = "MainCtlr";

            $scope.$on('$routeChangeSuccess', function(evt, route){
                console.log(route)
            });

            $rs.pollCurrent = 0;
            $rs.pollsOpened = 20;

            $scope.goNext = function() {
                if ($rs.now == 'welcome') {
                    $location.url('/poll/1')
                } else if ($rs.now == 'poll') {
                    if ($rs.pollCurrent < $rs.pollsOpened) {
                        $location.url('/poll/' + ++$rs.pollCurrent);
                    }
                } else if ($rs.now == 'eula') {
                    $location.url('/');
                }
            }

            $scope.goPrev = function() {
                if ($rs.now == 'welcome') {
                    // do nothing
                } else if ($rs.now == 'poll') {
                    if ($rs.pollCurrent > 1) {
                        $location.url('/poll/' + --$rs.pollCurrent);
                    }
                } else if ($rs.now == 'eula') {
                    $location.url('/');
                }
            }
        }
        module.controller('MainCtlr', MainCtlr);

        EulaCtlr.$inject = ['$rootScope'];
        function EulaCtlr($rs) {$rs.now = 'eula'}
        module.controller('EulaCtlr', EulaCtlr)

        WelcomeCtlr.$inject = ['$rootScope'];
        function WelcomeCtlr($rs) {$rs.now = 'welcome'}
        module.controller('WelcomeCtlr', WelcomeCtlr)
        
        ngc_poll(module);

        return module;
    };
}); 
