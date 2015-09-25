(function() {
    'use strict';

    angular
        .module('tiny-leaflet-directive')
        .factory('tldHelpers', tldHelpers);

    tldHelpers.$inject = ['$q', '$log'];

    function tldHelpers($q, $log) {
        return {
            getMapId: getMapId,
            getDefer: getDefer,
            getUnresolvedDefer: getUnresolvedDefer,
            setResolvedDefer: setResolvedDefer
        };

        function getMapId(d, mapId) {
            if (!angular.isDefined(mapId)) {
                var mapIds = Object.keys(d);
                if (mapIds.length === 1) {
                    mapId = mapIds[0];
                } else if (mapIds.length === 0) {
                    mapId = 'map';
                } else {
                    $log.error('[AngularJS - Tiny Leaflet Directive] - You have more than 1 map on the' +
                               ' DOM, you must provide the map ID to the tldMapService.getMap call');
                }
            }
            return mapId;
        }

        function getDefer(d, mapId) {
            var id = getMapId(d, mapId),
                defer;
            if (!angular.isDefined(d[id]) || d[id].resolvedDefer === false) {
                defer = getUnresolvedDefer(d, id);
            } else {
                defer = d[id].defer;
            }
            return defer;
        }

        function getUnresolvedDefer(d, mapId) {
            var defer;
            if (!angular.isDefined(d[mapId]) || d[mapId].resolvedDefer === true) {
                defer = $q.defer();
                d[mapId] = {
                    defer: defer,
                    resolvedDefer: false
                };
            } else {
                defer = d[mapId].defer;
            }
            return defer;
        }

        function setResolvedDefer(d, mapId) {
            d[mapId].resolvedDefer = true;
        }
    }
})();
