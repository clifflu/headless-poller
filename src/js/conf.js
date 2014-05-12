define([], function(){
    var region = 'ap-northeast-1',
        roles = {
            'aws': {
                'client_id': 'amzn1.application-oa2-client.33d528f0f7694bb1b5daf2a193b99d7b',
                'arn': 'arn:aws:iam::406053587786:role/headless-poller-aws',
            },
            'fb': {
                'app_id': '760277114004678',
                'arn': 'arn:aws:iam::406053587786:role/headless-poller-facebook',
            },
            'fb-local': {
                'app_id': '765789960120060',
                'arn': 'arn:aws:iam::406053587786:role/headless-poller-facebook-local',
            },
            'google': {
                'client_id': '367621037160-fv191nc48h4smv4lnmo53q6p2ge3up24.apps.googleusercontent.com',
                'arn': 'arn:aws:iam::406053587786:role/headless-poller-google',
            }, 
            'google-local': {
                'client_id': '367621037160-8jlfud0bqtrj4man9p97g2e91p5ijrqu.apps.googleusercontent.com',
                'arn': 'arn:aws:iam::406053587786:role/headless-poller-google-local'
            }
        }

    return {
        'base_url': '/headless-poller/index.htm#!/',
        'poll': {
            'url': '/headless-poller/poll.json'
        },
        'region': region,
        role: function(rn) {
            var locally = ('localhost' === location.hostname);

            switch (rn) {
                case 'aws':
                    return roles.aws;
                case 'fb':
                    return locally ? roles['fb-local'] : roles['fb'];
                case 'google':
                    return locally ? roles['google-local'] : roles['google']
            }
        }
    }
})
