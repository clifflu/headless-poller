({
    baseUrl: '../src/js/',
    mainConfigFile: '../src/js/config_require.js',
    name: "init",
    out: "../src/js/init-built.js",
    include: [
        'init', 'conf', 
        'ng_ctlr', 'ngc_login', 'ngc_poll', 'ngc_revoke',
        'ng_svc', 'ngs_vote'
    ],
    paths: {
        'init': "init",
        'angular-1.2.16': "empty:",
        'angular-cookies-1.2.16': "empty:",
        'angular-resource-1.2.16': "empty:",
        'angular-route-1.2.16': "empty:",
        'amzn-login': "empty:",
        'aws-2.0.0-rc14': "empty:", 
        'fb': "empty:",
        'g-plus-one': "empty:",
        'jquery-1.11.0': "empty:",
        'jq-throttle-1.1': "empty:",
    },
})

