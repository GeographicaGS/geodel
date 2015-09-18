var deps = {};

deps.templateFolder = 'js/template';

deps.JS = [
    'js/lib/jquery-2.1.4.js',
    'js/lib/underscore-1.8.3.js',
    'js/lib/mustache.min.js',
    'js/lib/backbone-1.2.0.js',
    'js/lib/sprintf.js',
    'js/lib/fixedsticky.js',
    'js/lib/leaflet/google.js',
    'js/lib/leaflet/leaflet.markercluster-src.js',


    // Namespace
    'js/Namespace.js',
    'js/Config.js',
    "js/md5.js",
    "js/Map.js",
   
    
    // --------------------
    // ------  Views ------
    // --------------------
    'js/View/ErrorView.js',
    'js/View/NotFoundView.js',
    'js/View/MapView.js',
    'js/View/LoginView.js',
    'js/View/ApplyListView.js',
    'js/View/ApplyView.js',

    // --------------------
    // ------  Collections ------
    // --------------------
    'js/collection/ApplyCollection.js',
    'js/collection/ApplyGeomCollection.js',

    // --------------------
    // ------  Models ------
    // --------------------

    'js/model/ApplyModel.js',
    
    // router
    'js/Router.js',
    // app
    'js/App.js'
];



deps.lessFile = 'css/styles.less';

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}