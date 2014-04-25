define(['@jquery', 'ngc_poll'], 
function($, ngc_poll){
    return function(module) {

        MainCtlr.$inject = ['$rootScope', '$scope', '$location', '$route'];
        function MainCtlr($rs, $scope, $location, $route) {
            $scope._name = "MainCtlr";

            $rs.pollCurrent = 1;
            $rs.pollsOpened = 20;

            $rs.go_page = function(section, param) {
                switch (section) {
                    case 'welcome':
                        $location.url('/');
                        break;
                    case 'poll':
                        $location.url('/poll/' + param * 1);
                        break;
                    case 'eula':
                        $location.url('/eula');
                        break;
                }
            }

            $scope.goNext = function() {
                if ('poll' == $rs.now ) {
                    if ($rs.pollCurrent < $rs.pollsOpened) {
                        $rs.pollCurrent++;
                    } else {
                        $rs.pollCurrent = 1;
                    }
                }

                $rs.go_page('poll', $rs.pollCurrent);
            }

            $scope.goPrev = function() {
                if ('poll' === $rs.now) {
                    if ($rs.pollCurrent > 1) {
                        $rs.pollCurrent --;
                    } else {
                        $rs.pollCurrent = $rs.pollsOpened;
                    }
                }

                $rs.go_page('poll', $rs.pollCurrent);
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
