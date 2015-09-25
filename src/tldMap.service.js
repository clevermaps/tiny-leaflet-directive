(function() {
    'use strict';

    angular
        .module('tiny-leaflet-directive')
        .factory('tldMapService', tldMapService);

    tldMapService.$inject = ['tldHelpers'];

    function tldMapService(tldHelpers) {
        var maps = {};

        return {
            setMap: setMap,
            getMap: getMap,
            unresolveMap: unresolveMap
        };

        function setMap(leafletMap, mapId) {
            var defer = tldHelpers.getUnresolvedDefer(maps, mapId);
            defer.resolve(leafletMap);
            tldHelpers.setResolvedDefer(maps, mapId);
        }

        function getMap (mapId) {
            var defer = tldHelpers.getDefer(maps, mapId);
            return defer.promise;
        }

        function unresolveMap(mapId) {
            maps[mapId] = undefined;
        }
    }
})();
