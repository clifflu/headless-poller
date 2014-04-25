define(['@jquery'], 
function($){
    PollCtlr.$inject = ['$rootScope', '$scope', '$log', '$route', '$timeout', 'pollopt', 'votes'];
    function PollCtlr($rs, $scope, $log, $route, $timeout, pollopt, votes){
        var EPSILON = 0.00001;

        $rs.chk_cred();

        $rs.now = 'poll';

        $rs.pollCurrent = Math.floor(1 * $route.current.params.d);
        $rs.pollsOpened = 1;

        $rs.$watchCollection('pollopt', function(newV, oldV){
            function count(obj){
                var c = 0;
                for (var i in obj)
                    obj.hasOwnProperty(i) && c++;
                return c;
            }
            $scope.poll = $rs.pollopt[$rs.pollCurrent];
            $rs.pollsOpened = count($rs.pollopt);
        })
        
        $scope.poll = $scope.poll || {};
        $scope.votes = $scope.votes || {};
        $scope.votesmax = EPSILON;

        $scope.divpct = function(p, q) { return Math.ceil(100 * p / q)}

        $scope.vote = function(o_id){
            votes.vote_for($rs.pollCurrent, o_id);
        }

        function update_data() {
            $rs.votecount = $rs.votecount || {};
            $rs.votecount[$rs.pollCurrent] = $rs.votecount[$rs.pollCurrent] || {};
            votes.update($rs.pollCurrent);

            if ($rs.identity)
                $timeout(update_data, 3000);
        }
        
        update_data();

        $scope.$watchCollection('votes', function(){
            $scope.votesmax = EPSILON;
            $scope.votes = $rs.votecount[$rs.pollCurrent];

            for (var i in $scope.votes) {
                if (!$scope.votes.hasOwnProperty(i))
                    continue;
                if ($scope.votes[i] > $scope.votesmax)
                    $scope.votesmax = $scope.votes[i] ;
            }
        })
    }

    return function(module){
        module.controller('PollCtlr', PollCtlr);
        return module;
    }
})
