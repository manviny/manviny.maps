angular.module('manviny.maps',['leaflet-directive'])
.factory('mnymapa', function ($q, $rootScope, leafletData) {

    // A.- GLOBAL VARIABLES
   
      // var userDetails = {};    // user email, name, passw ...

    // B.- FUNCTIONS
 
    // set markers on map 
    var setDefaultMap = function(){ 

            angular.extend($rootScope, {
                centerHere: {lat: 39.50300178969824,lng: -3.878173828125 ,zoom: 11}, 
                
                // markers to be populated dinamically
                 myMarkers: { },

                events: {
                    map: {enable: ['mouseup', 'click', 'zoomend'], logic: 'emit'},
                    markers: {enable: ['mouseup', 'click', 'dblclick'], logic: 'emit'}
                },
                layers: {
                    baselayers: {
                        s3: {
                            name: 's3',
                            url: 'https://s3-eu-west-1.amazonaws.com/mnytiles/spain/mnytiles/{z}/{x}/{y}.jpg',
                            type: 'xyz'
                        },    
                          osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        },                        
                     
                        // paterna: {
                        //     name: 'paterna',
                        //     url: 'mapTiles/{z}/{x}/{y}.png',
                        //     type: 'xyz'
                        // }, 

                        // cloudmade2: {
                        //     name: 'Satelite',
                        //     type: 'xyz',
                        //     url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                        // }
                    }
                },                
                defaults: {
                    
                    // Not used because we're using baselayers
                    // tileLayer: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", //satelite
                    // tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", //cycle
                    // tileLayer: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", //openstreetmap

                    tileLayerOptions: {opacity: 0.9,detectRetina: true,reuseTiles: true,},
                    maxZoom:17,
                    scrollWheelZoom: true
                }
            });
    };

    /**
     * [pushMarkers add markers to actual map]
     * @param  {[type]} markers array of markers 
     *  {
          lat: parseFloat(39.50300178969824),
          lng: parseFloat(-3.878173828125),
          focus: false,
          message: '<p>yo</p>'
        }
     * @return {[type]}         [description]
     */
    var pushMarkers = function(markers) {
       angular.extend($rootScope, {myMarkers:markers});
    }

    /**
     * [fitMarkers fit markers on map]
     * @param  {[type]} markers [description]
     * @return {[type]}         [description]
     */
    var fitMarkers = function(markers) {
      leafletData.getMap()
      .then(function(map) {
          map.fitBounds(markers);
      });      
    }

    /**
     * [myPosition adds user position marker to map and fit bounds]
     * @return {[type]} [description]
     */
    var  myPosition = function() {
      // Si tiene geolocalizador
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $rootScope.myMarkers.push({lat: position.coords.latitude, lng: position.coords.longitude, focus: true, message: '<p>yo</p>'});
            leafletData.getMap()
            .then(function(map) { map.fitBounds($rootScope.myMarkers,{maxZoom:17, padding:[20,20]});});  
        });
      }    
    }


    // C.- PUBLIC METHODS
    return {
      setDefaultMap: setDefaultMap,         // sets default map values
      pushMarkers: pushMarkers,             // add markers to the map
      fitMarkers: fitMarkers,               // fit markers on map
      myPosition: myPosition,               // adds user position marker to map  and fit bounds
    };      


    // D.- PRIVATE FUNCTIONS
  });