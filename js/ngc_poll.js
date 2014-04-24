define([], function(){
    PollCtlr.$inject = ['$rootScope', '$scope', '$route'];
    function PollCtlr($rs, $scope, $route){
        $rs.now = 'poll';
        $rs.pollCurrent = 1 * $route.current.params.d;
    }

    return function(module){
        module.controller('PollCtlr', PollCtlr);
        return module;
    }
})
