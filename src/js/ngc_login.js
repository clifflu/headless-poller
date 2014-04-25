define(['@jquery', '@aws', 'conf', 'amzn-login', 'fb']
.concat(['g-plus-one', '@jq-throttle']),
function($, AWS, conf, amazon, FB){

    LoginCtlr.$inject = ['$log', '$rootScope', '$scope', '$http', 'url', 'awsCred'];
    function LoginCtlr($log, $rs, $scope, $http, url, awsCred){

        $rs.chk_cred().then(function(data){
            url.go('poll', 1); 
        });

        function login(params, identity) {
            awsCred.login(params, identity).then(function(){
                url.go('poll', 1);
            }, function(err){
                $log.warn(err);
                alert("Oops, login failed somehow");
            })
        }

        function login_amazon_cb(resp) {
            if ( resp['status'] !== 'complete') {
                alert('Login failed');
                return $log.warn(resp);
            }

            $http({
                method: 'GET',
                url: 'https://api.amazon.com/user/profile',
                headers: {
                    'Authorization': 'bearer ' + resp.access_token
                }
            }).then(function(data){

                login({
                    RoleArn: conf.aws.role_arn,
                    ProviderId: 'www.amazon.com',
                    WebIdentityToken: resp['access_token'],
                    DurationSeconds: 3600
                }, data.data.user_id);

            }, function(err){
                $log.warn(err);
            })
        }

        $scope.login_amazon = function() {
            var options = { scope : 'profile' };
            amazon.Login.setClientId(conf.aws.client_id);
            amazon.Login.authorize(options, login_amazon_cb);
        }

        function login_facebook_cb(resp) {
            if (resp.status !== 'connected') {
                return FB.login();
            }
            
            login({
                RoleArn: conf.fb.role_arn,
                ProviderId: 'graph.facebook.com',
                WebIdentityToken: resp.authResponse.accessToken,
                DurationSeconds: 3600
            }, resp.authResponse.userID);
        }

        $scope.login_facebook = function() {
            FB.init({
                appId      : conf.fb.app_id,
                status     : true, // check login status
                // cookie     : true, // enable cookies to allow the server to access the session
                // xfbml      : true  // parse XFBML
            });

            FB.Event.subscribe('auth.authResponseChange', login_facebook_cb);
        };

        function login_google_cb(authResult) {
            if (!authResult['status']['signed_in']) {
                alert('Login failed');
                return;
            }
            gapi.client.load('plus','v1', function(){
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.execute(function(resp) {
                    login({
                        RoleArn: conf.google.role_arn,
                        WebIdentityToken: authResult.id_token,
                        DurationSeconds: 3600,
                    }, resp.id);
                });
            });
        }

        $scope.login_google = function() {
            gapi.auth.signIn({
                'callback': $.debounce(50, login_google_cb),
                'clientid': conf.google.client_id
            }); 
        }
    }

    return function(module){
        module.controller('LoginCtlr', LoginCtlr);
        return module;
    }
})
