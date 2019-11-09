<template>
<div class="center">
  <TheMap class="google_map"/>   
  <LocationInputter class="location_inputter"/>
</div>
</template>

<script>
import TheMap from '../Map/Map'
import LocationInputter from '../LocationInputter/LocationInputter'

export default {
    name: 'journal',
    components: {
    TheMap,
    LocationInputter
  },
};
</script>

<style lang="less" scoped>
  // .map {
  //   margin-right:20em;
  //   margin-left:20em;
  //   border: 4em;
  //   border-color: blue;
  // }
  .google_map{
    width:55%;
    margin-right:2%;
    float: left;
}
.google_map iframe{
   width:100%;
}
.location_inputter {
    width:42%;
    float: left;
}
.clearfix{
    clear:both
}
</style>
