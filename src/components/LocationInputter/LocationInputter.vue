<template>
  <div class="locationInputter"> 
    <h3 id="title"><center>Location Inputter</center></h3>
    <div>
    <input id="locationTextFieldLat" type="text" placeholder="Enter a Latitude">
    </div>
    <div>
    <input id="locationTextFieldLong" type="text" placeholder="Enter a Longitude">
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
   mutations: {
    increment (state) {
      // mutate state
      state.count++
    },
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
  height: 6vh;
  font-size: 2em;
  background-color: darkgrey;
  color: whitesmoke;
  vertical-align: middle;
}
#locationTextFieldLat {
  width: 100%;
  height: 5vh;
  margin: 2em 0em 0em 0em;
}
#locationTextFieldLong {
  width: 100%;
  height: 5vh;
  margin: 2em 0em 0em 0em;
}
#submitButton {
  background-color: #4CAF50;
  border: none;
  color: white;
  margin: 2em 0em 0em 0em;
  padding: 16px 32px;
  text-decoration: none;
 
  width: 100%;
  cursor: pointer;
}
</style>