define(['@jquery', 'ngc_poll', 'ngc_login', 'ngc_revoke'], 
function($, ngc_poll, ngc_login, ngc_revoke){
    return function(module) {

        MainCtlr.$inject = ['$rootScope', '$scope', '$log', '$q', '$location', '$route', 'awsCred', 'url'];
        function MainCtlr($rs, $scope, $log, $q, $location, $route, awsCred, url) {
            $scope._name = "MainCtlr";

            $rs.chk_cred = function() {
                var _d = $q.defer(),
                    _p = _d.promise;
                
                awsCred.is_valid().then(function(cred){
                    _d.resolve(cred);
                }, function(err){
                    $log.warn(err);
                    _d.reject(err);
                    url.go('login');
                });

                return _p;
            }

            $rs.logout = function() {
                awsCred.logout();
            }

            $rs.go_page = function(section, param) {
                if ('welcome' === section) {
                    url.go('welcome');
                }

                awsCred.is_valid().then(function(){
                    if ('login' === section) 
                        section = 'welcome';
                    url.go(section, (param * 1));
                }, function(){
                    url.go('login')
                });
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

        WelcomeCtlr.$inject = ['$rootScope'];
        function WelcomeCtlr($rs) {$rs.now = 'welcome'}
        module.controller('WelcomeCtlr', WelcomeCtlr)
        
        ngc_poll(module);
        ngc_login(module);
        ngc_revoke(module);

        return module;
    };
}); 
