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
