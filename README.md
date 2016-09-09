# Tiny Leaflet Directive

A tiny JavaScript module to embed LeafletJS map in your AngularJS application.

It is a super simplified version of great [angular-leaflet-directive](https://github.com/tombatossals/angular-leaflet-directive)
module.

## Usage

Install with Bower and include script in `index.html`:

```bash
bower install tiny-leaflet-directive
```

Include `tiny-leaflet-directive` module in your app dependencies:

```javascript
angular.module('myApp', ['tiny-leaflet-directive']);
```

Directives and services of this module are prefixed with `tld`.
Include the directive `<tld-map>` in your template like this:

```html
<tld-map id="map" tld-options="::mapOptions" style="width:100%; height:480px;"></tld-map>
```

There is one parameter tld-options which is basically an object with default
Leaflet map options. Full list of possible options can be found in [LeafletJS Docs](http://leafletjs.com/reference.html#map-options).
An example options, that specifies default view and base layer may look like this:

```javascript
$scope.mapOptions = {
    center: [49.2, 16.6],
    zoom: 10,
    layers: [L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})]
};
```

The directive element has class `tld-map` to simplify styling with CSS.

You can include `tldMapService` in your application and use it's `getMap(id)` function
to get the real Leaflet Map object and play with it.

## Dependencies

This module depends only on AngularJS and LeafletJS. Run `bower install` to install
both dependencies.

## Examples

* [Simple map](examples/simpleMap.html), see in [Plunker](http://plnkr.co/edit/qNIZaN)
* [Own map service](examples/ownMapService.html), see in [Plunker](http://plnkr.co/edit/qRXApR)

To view the examples locally, clone the repo, run `bower install` and open them in your favourite browser.

CleverAnalytics uses this module in production. Feel free to try the demo at [https://demo.cleveranalytics.com](https://demo.cleveranalytics.com).

## Changelog

### 2016-09-09 Version 0.1.0

* Rewritten `angular.directive` to `angular.component`
* WARNING: DOM of this component has changed, make sure to check/update your CSS (from `<div id="map" class="tld-map"></div>` to `<tld-map id="map"><div class="tld-map"></div></tld-map>`)

### 2016-09-06 Version 0.0.4

* Published to NPM
