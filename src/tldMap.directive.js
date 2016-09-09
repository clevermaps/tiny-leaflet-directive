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
        var id = tldHelpers.getMapId({}, $attrs.id);
        var mapDefaults = tldDefaults.setMapDefaults(this.options, id);
        var map = new L.Map($element.children('.tld-map')[0], mapDefaults);

        // Resolve the map object to the promises
        map.whenReady(function() {
            tldMapService.setMap(map, id);
        });

        this.$onDestroy = function() {
            map.remove();
            tldMapService.unresolveMap(id);
        };
    }
})();
