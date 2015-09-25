(function() {
    'use strict';

    angular
        .module('tiny-leaflet-directive')
        .directive('tldMap', tldMap);

    tldMap.$inject = [
        'tldMapService',
        'tldDefaults',
        'tldHelpers'
    ];

    function tldMap(tldMapService, tldDefaults, tldHelpers) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=tldOptions'
            },
            template: '<div class="tld-map"></div>',
            link: linkFunc
        };

        function linkFunc(scope, element, attrs) {
            var id = tldHelpers.getMapId({}, attrs.id),
                mapDefaults = tldDefaults.setMapDefaults(scope.options, id),
                map = new L.Map(element[0], mapDefaults);

            // Resolve the map object to the promises
            map.whenReady(function() {
                tldMapService.setMap(map, id);
            });

            scope.$on('$destroy', function() {
                map.remove();
                tldMapService.unresolveMap(id);
            });
        }
    }
})();
