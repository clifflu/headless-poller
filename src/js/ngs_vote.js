define([], function(){
    VotesFactory.$inject = ['$rootScope', '$log', '$timeout', '$q', 'awsCred', 'pollopt'];
    function VotesFactory($rs, $log, $timeout, $q, awsCred, pollopt) {
        $rs.votecount = $rs.votecount || {}

        var _last_update = [],
            _promises = [], 
            _db_p;

        $rs.$on('logged_out', function(){
            console.log("User Logout");
            _db_p = false;
        })

        $rs.$on('logged_in', function(){
            // do nothing, create DB object lazily
        })

        function db_promise(){
            return _db_p || _new_db();
        }

        function _new_db() {
            var _d = $q.defer(), 
                _db;
            
            _db_p = _d.promise;
            
            awsCred.feed_sdk().then(function(){
                _db = new AWS.DynamoDB();
                _d.resolve(_db);
            }, function(err){
                $log.warn(err);
                _d.reject(err);
            })

            return _db_p;
        }

        function vote_for(q_id, o_id) {
            var _d = $q.defer(),
                _p = _d.promise;

            db_promise().then(function(db){
                db.updateItem({
                    TableName: 'cl-hp-votes',
                    Key: {
                        uid: {"S": $rs.identity},
                        q_id: {"N": String(q_id)}
                    },
                    AttributeUpdates: {
                        o_id: {Value: {"N": String(o_id)}, Action: 'PUT'}
                    },
                    ReturnValues: 'UPDATED_OLD',
                }, function(err, data){
                    if (err) {
                        _d.reject(err);
                        return ;
                    }

                    $rs.votecount[q_id][data.Attributes.o_id.N] --;
                    $rs.votecount[q_id][o_id] ++;
                    $rs.$digest();

                    _d.resolve();
                })
            })

            return _p;
        }

        function update(q_id) {
            $rs.votecount[q_id] = $rs.votecount[q_id] || {}

            var diff = Date.now() - (_last_update[q_id] || 0);
            if (diff < 5000 && _promises[q_id]) {
                return _promises[q_id];
            }

            _last_update[q_id] = Date.now();

            if (_promises[q_id]) {
                var last_p = _promises[q_id];

                $timeout(function(){
                    var _p = _update(q_id);
                    
                    _p.then(function(){
                        _promises[q_id] = _p;
                    })
                })
                return last_p;
            }

            _promises[q_id] = _update(q_id);
            return _promises[q_id];
        }

        function _update(q_id) {
            var _d = $q.defer(), 
                _p = _d.promise;

            $q.all([pollopt.update(), awsCred.feed_sdk()])
            .then(function(){
                var empty_promises = [];

                for (var i in $rs.pollopt[q_id]['options']) {
                    if (!$rs.pollopt[q_id]['options'].hasOwnProperty(i))
                        continue;

                    empty_promises.push(_update_qo(q_id, $rs.pollopt[q_id]['options'][i].id))
                }

                $q.all(empty_promises).then(function(){
                    _d.resolve();
                })
            }, function(err){
                $log.warn(err);
                _last_update[q_id] = 0;
            })

            return _p;
        }

        function _update_qo(q_id, o_id) {
            var _d = $q.defer(),
                _p = _d.promise;

            db_promise().then(function(db){
                db.query({
                    'TableName': "cl-hp-votes", 
                    'IndexName': "q_id-o_id-index",
                    'KeyConditions': {
                        "q_id": {"ComparisonOperator": "EQ", "AttributeValueList": [{"N":String(q_id)}]},
                        "o_id": {"ComparisonOperator": "EQ", "AttributeValueList": [{"N":String(o_id)}]},
                    },
                    'Select': 'COUNT'
                }, function(err, data){
                    if (err){
                        $log.warn(err);
                        _d.reject(err);
                    } else {
                        $rs.votecount[q_id][o_id] = data.Count
                        _d.resolve(data);
                    }
                }) ;                
            })

            return _p;
        }

        return {
            update: update,
            vote_for: vote_for
        }
    }

    return function (module) {
        module.factory('votes', VotesFactory);
        return module;
    }
});
