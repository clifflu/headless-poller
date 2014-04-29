define([], function(){

    RevokeCtlr.$inject = ['$rootScope', '$log', '$scope', '$route', '$cookieStore', 'url'];
    function RevokeCtlr($rs, $log, $scope, $route, $cookieStore, url){

        $scope.revoke_google = function() {
            var access_token = $cookieStore.get('auth.google');
            console.log("revoking");
            if (!access_token) {
                return;
            }

            var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
                access_token;

            // Perform an asynchronous GET request.
            $.ajax({
                type: 'GET',
                url: revokeUrl,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(nullResponse) {
                    $log.info("Revoke Success, Supposingly");
                },
                error: function(e) {
                  $log.warning("Failed, please revoke manually.")
                  url.go('https://plus.google.com/apps');
                }
          });
        }
    }

    return function(module){
        module.controller('RevokeCtlr', RevokeCtlr);
        return module;
    }
})
