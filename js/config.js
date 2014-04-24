https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js

var require = {
    baseUrl: '/js/',
    map: {
        '*': {
            '@jquery': 'jquery-1.11.0',
            '@ng': 'angular-1.2.16',
            '@ng-resource': 'angular-resource-1.2.16',
            '@ng-route': 'angular-route-1.2.16',
        },
    },
    paths: {
        'angular-1.2.16' : [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min'
        ],
        'angular-resource-1.2.16' : [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-resource.min',
        ],
        'angular-route-1.2.16' : [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
        ],
        'jquery-1.11.0': [
            '//code.jquery.com/jquery-1.11.0.min',
        ],
    },
    shim: {
        'angular-1.2.16' : {exports: 'angular', deps: ['@jquery']},
        'angular-resource-1.2.16' : {exports: null, deps: ['@jquery', '@ng']},
        'angular-route-1.2.16' : {exports: null, deps: ['@jquery', '@ng']},
        'jquery-1.11.0': {exports: 'jQuery'},
    },
}

