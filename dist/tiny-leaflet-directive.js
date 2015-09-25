/**
 * Tiny Leaflet Directive, tiny LeafletJS map directive for your AngularJS apps.
 * (c) 2015, CleverAnalytics, s.r.o. http://cleveranalytics.com
 * Version: 0.0.1
 * License: MIT
 */
(function() {
    'use strict';

    angular.module('tiny-leaflet-directive', []);
})();

(function() {
    'use strict';

    angular
        .module('tiny-leaflet-directive')
        .factory('tldDefaults', tldDefaults);

    function tldDefaults() {
        var defaults = {};

        return {
            getMapDefaults: getMapDefaults,
            setMapDefaults: setMapDefaults
        };

        function getMapDefaults(mapId) {
            return defaults[mapId];
        }

        function setMapDefaults(userDefaults, mapId) {
            defaults[mapId] = angular.copy(userDefaults);
            return defaults[mapId];
        }
    }
})();

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
