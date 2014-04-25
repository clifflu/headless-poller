define([], function(){
    PollCtlr.$inject = ['$rootScope', '$scope', '$route'];
    function PollCtlr($rs, $scope, $route){
        $rs.now = 'poll';
        $rs.pollCurrent = 1 * $route.current.params.d;

        $scope.quiz = "asdf";
        $scope.options = [
            {id: 1, title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
            {id: 2, title: 'aaab'},
            {id: 3, title: 'aaba'},
            {id: 4, title: 'abaa'},
        ]

    }

    return function(module){
        module.controller('PollCtlr', PollCtlr);
        return module;
    }
})
