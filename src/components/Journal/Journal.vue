<template>
<div class="center">
  <div><h1>This is the map</h1></div>
  <div class="map">
      <TheMap/>   
  </div> 
</div>
</template>

<script>
import TheMap from '../Map/Map'

export default {
    name: 'journal',
    components: {
    TheMap,
  },
};
</script>

<style lang="less" scoped>
.map {
  margin-right:20em;
  margin-left:20em;
}
</style>
