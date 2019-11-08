<template>
    <div class="App"/>
</template>

<script>

// https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/

import gmapsInit from './gmaps';
import locations from './mapMarkers';

export default {
  name: 'TheMap',
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      const markers = locations.map(x => new google.maps.Marker({ ...x, map }));
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 50vw;
  height: 50vh;
}
</style>