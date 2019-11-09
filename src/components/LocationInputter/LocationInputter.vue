<template>
  <div class="locationInputter"> 
    <h3 id="title">Location Inputter</h3>
    <div>
    <h3>Lat:</h3>
    <input id="locationTextFieldLat" type="text">
    </div>
    <div>
    <h3>Long:</h3>
    <input id="locationTextFieldLong" type="text">
    </div>
    <div>
    <button id="submitButton" @click="search()">Submit</button>
    </div>
  </div>
</template>

<script>
import gplacesearch from '../LocationInputter/gplacesearch'
// import search from '../../../store/modules/maps';


export default {
    name: 'LocationInputter',
    components: {
  },
  methods: {
    search(){
      document.getElementById('locationTextFieldLat').value = '';
      document.getElementById('locationTextFieldLong').value = '';
    }
  },
}
</script>

<style lang="less" scoped>
.locationInputter {
  border-color: black;
  border-width: 10px;
  height: 50vmax;
}
#title {
  border-color: darkgrey;
  border-width: 3px;
  height: 4vh;
  background-color: darkgrey;
  color: whitesmoke;
}
#locationTextFieldLat {
  width: 100%;
  height: 5vh;
}
#locationTextFieldLong {
  width: 100%;
  height: 5vh;
}
#submitButton {
  background-color: #4CAF50;
  border: none;
  color: white;
  margin: 5em 0em 0em 0em;
  padding: 16px 32px;
  text-decoration: none;
 
  width: 100%;
  cursor: pointer;
}
</style>