define(['conf', '@jquery', '@aws', 'ngs_vote'],
function(conf, $, AWS, ngs_vote){
    var _enable_cookie_cache = true;

    UrlSvc.$inject = ['$log', '$location', '$timeout'];
    function UrlSvc($log, $location, $timeout) {
        this.go = function(section, param) {
            var that = this;

            if (section.indexOf("http") == 0 || section.indexOf("//") == 0) {
                $location.url(section);
                return
            }

            $timeout(function(){
                location.href = that.get_partial(section, param);
            })
        }

        this.get_partial = function(section, param) {
            switch(section) {
                case 'welcome':
                    return conf.base_url;
                case 'poll':
                    return conf.base_url + 'poll/' + param * 1;
                case 'login':
                    return conf.base_url + 'login/';
            }
        }

        this.get = function(section, param) {
            var base = $location.protocol() + "://" + $location.host()

            if (
                ($location.protocol() == 'http' && $location.port() !== 80) ||
                ($location.protocol() == 'https' && $location.port() !== 443)
            ) {
                base += ":" + $location.port();
            }

            base += conf.base_url ;
            base += this.get_partial(section, param)

            return base;
        }

    }

    AWSCredFactory.$inject = ['$rootScope', '$log', '$cookieStore', '$q', 'url']
    function AWSCredFactory($rs, $log, $cs, $q, url){
        var _cred = null;

        /**
         * Returns cred object and write to _cred
         */
        function cred () {
            if (_enable_cookie_cache && !_cred) {
                if (cookie_login_params = $cs.get('login_params')) {
                    _cred = new AWS.WebIdentityCredentials(cookie_login_params);
                    $rs.identity = $cs.get('login_identity');
                }
            }

            return _cred || null;
        }

        function logout () {
            _cred = null;
            $rs.identity = undefined;
            AWS.config.credentials = null;
            $cs.remove('login_params');
            $cs.remove('login_identity');

            url.go('welcome');
        }

        /**
         * Called when user logs in 
         */
        function login (params, identity){
            _cred = new AWS.WebIdentityCredentials(params);
            $rs.identity = identity;
            
            $cs.remove('login_params');
            $cs.remove('login_identity');

            if (_enable_cookie_cache) {
                $cs.put('login_params', params);
                $cs.put('login_identity', identity);
            }
            return refresh();
        }

        function feed_sdk () {
            AWS.config.region = conf.region;
            AWS.config.credentials = cred();
            return refresh();
        }

        /**
         * Refresh _cred if needed, returns promise object
         */
        function refresh () {
            var _d = $q.defer(), 
                _p = _d.promise;
            
            cred();

            if (!_cred) {
                _d.reject("Invalid Cred");
                return _p;
            }

            if (_cred.needsRefresh()) {
                _cred.refresh(function(err, data){
                    if (err) {
                        $log.warn(['refresh failed', err])
                        logout();
                        _d.reject(err);
                    } else {
                        _d.resolve(cred);
                    }
                }); 
            } else {
                _d.resolve(_cred);
            }
            return _p;
        }

        function is_valid() {
            return refresh();
        }

        return {
            is_valid: is_valid,
            feed_sdk: feed_sdk,
            login: login,
            logout: logout
        }
    }

    PollOptFactory.$inject = ['$rootScope', '$log', '$q', '$http']
    function PollOptFactory($rs, $log, $q, $http) {
        $rs.pollopt = $rs.pollopt || {}

        function update(){
            var _d = $q.defer(),
                _p = _d.promise;

            $http({
                method: 'GET', cache: true,
                url: conf.poll.url
            }).then(function(data){
                $.extend($rs.pollopt, data.data);
                _d.resolve($rs.pollopt);
            }, function(err){
                _d.reject(err);
                $log.warn(err);
            })

            return _p;
        }

        return  {
            update: update,
        }
    }

    return function(module) {
        ngs_vote(module);

        module.service('url', UrlSvc);
        module.factory('pollopt', PollOptFactory);
        module.factory('awsCred', AWSCredFactory);

        return module;
    }
});
