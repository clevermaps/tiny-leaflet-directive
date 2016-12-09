(function() {
    'use strict';

    angular
        .module('tiny-leaflet-directive')
        .component('tldMap', {
            bindings: {
                options: '<tldOptions'
            },
            template: '<div class="tld-map"></div>',
            controller: TldMapCtrl
        });

    TldMapCtrl.$inject = [
        '$element',
        '$attrs',
        'tldMapService',
        'tldDefaults',
        'tldHelpers'
    ];

    function TldMapCtrl(
        $element,
        $attrs,
        tldMapService,
        tldDefaults,
        tldHelpers
    ) {
        var ctrl = this;
        var id = tldHelpers.getMapId({}, $attrs.id);
        var map;

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;

        function onInit() {
            var mapDefaults = tldDefaults.setMapDefaults(ctrl.options, id);
            map = new L.Map($element.children('.tld-map')[0], mapDefaults);

            // Resolve the map object to the promises
            map.whenReady(function() {
                tldMapService.setMap(map, id);
            });
        }

        function onDestroy() {
            map.remove();
            tldMapService.unresolveMap(id);
        }
    }
})();
