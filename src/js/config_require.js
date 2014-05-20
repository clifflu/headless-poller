var require = {
    baseUrl: '/headless-poller/js/',
    waitSeconds: 2,
    map: {
        '*': {
            '@aws': 'aws-2.0.0-rc14',
            '@jquery': 'jquery-1.11.0',
            '@jq-throttle': 'jq-throttle-1.1',
            '@ng': 'angular-1.2.16',
            '@ng-cookies': 'angular-cookies-1.2.16',
            '@ng-resource': 'angular-resource-1.2.16',
            '@ng-route': 'angular-route-1.2.16',
        },
    },
    paths: {
        'angular-1.2.16' : [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min',
            'lib/angular.min'
        ],
        'angular-cookies-1.2.16' : [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-cookies.min',
            'lib/angular-cookies.min'
        ],
        'angular-resource-1.2.16' : [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-resource.min',
            'lib/angular-resource.min'
        ],
        'angular-route-1.2.16' : [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
            'lib/angular-route.min'
        ],
        'amzn-login': [
            'https://api-cdn.amazon.com/sdk/login1',
            'lib/amzn-login1'
        ],
        'aws-2.0.0-rc14': [
            '//sdk.amazonaws.com/js/aws-sdk-2.0.0-rc.14.min',
            'lib/aws-sdk-2.0.0-rc.14.min'
        ],
        'fb': '//connect.facebook.net/en_US/all',
        'g-plus-one': 'https://apis.google.com/js/client:plusone',
        'init': [
            'init-built', 
            'init'
        ],
        'jquery-1.11.0': [
            '//code.jquery.com/jquery-1.11.0.min',
            'lib/jquery-1.11.0.min'
        ],
        'jq-throttle-1.1': [
            '//cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min',
            'lib/jquery.ba-throttle-debounce.min'
        ]
    },
    shim: {
        'amzn-login': {exports: 'amazon'},
        'angular-1.2.16': {exports: 'angular', deps: ['@jquery']},
        'angular-cookies-1.2.16': {exports: null, deps: ['@ng']},
        'angular-resource-1.2.16': {exports: null, deps: ['@ng']},
        'angular-route-1.2.16': {exports: null, deps: ['@ng']},
        'aws-2.0.0-rc14': {exports: 'AWS'},
        'fb': {exports: 'FB'},
        'jquery-1.11.0': {exports: 'jQuery'},
        'jq-throttle-1.1': {exports: null, deps: ['@jquery']},
    },
}

