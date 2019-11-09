<template>
    <div class="gmap"/>
</template>

<script>

// https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/


// Goal: Incorporate Maps, Routes, (Places for trees)
// Currently only have map working


// Google Library for clustering "close" markers so that it looks less messy
import MarkerClusterer from '@google/markerclusterer';
import gmapsInit from './gmaps';

// temporary location for markers that would later be fetched from DB (presumably)
import locations from './mapMarkers';
// import placesExampleJSON from '../LocationInputter/gplacesearch'

export default {
  name: 'TheMap',
  async mounted() {
    try {
      // console.log(placesExampleJSON);
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: 'Boston' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      // Handles marker creation via clickEvent
      // Currently not working
      const markerClickHandler = (marker) => {
        map.setZoom(13);
        map.setCenter(marker.getPosition());
      };

      const markers = locations.map((location) => {
          const marker = new google.maps.Marker({ ...location, map });
          marker.addListener('click', () => markerClickHandler(marker));
          return marker;
        });

      // Initialization of Clustering
      new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      });

    } catch (error) {
      console.error(error);
    }
  },
  methods: { 
    search(){
      console.log('Submit Clicked');
        service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
          }
        });
  },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.gmap {
  width: 50vmax;
  height: 50vmax;
}
</style>