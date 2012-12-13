exports.routes = function (map) {

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.root('gif#index');
    map.get('add','gif#add');
    map.get('view/:id','gif#view');
    map.resources('gif');
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};
