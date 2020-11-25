<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker v-for="bike in bikes" :lat-lng="bike.location.coordinates" :key="bike.name">
      <!-- <l-popup :content="bike.name"/> -->
      <l-popup>
        {{bike.name}}
        <a v-on:click="updateBike(bike)">Update</a>
        <br/>
        <a v-on:click="deleteBike(bike._id)">Delete</a>
        Plus d'infos
        <!-- <img src="../../assets/pin.png"> -->
      </l-popup>
      <l-icon
                :icon-anchor="staticAnchor"
                class-name="someExtraClass">
        <img class="marker" src="../../assets/pin.png">
      </l-icon>
    </l-marker>
    <!-- <l-marker :lat-lng="[47.413220, -1.189482]">
      <l-popup>
        test
      </l-popup>
      <l-icon
                :icon-anchor="staticAnchor"
                class-name="someExtraClass">
        <img class="marker" src="../../assets/pin.png">
      </l-icon>
    </l-marker> -->
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LIcon, LPopup} from 'vue2-leaflet';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup
  },
  data() {
    return {
      // bikes: [
      //   { name: 'Sol', lng: -1.229482, lat: 47.413220 },
      //   { name: 'Mizar', lng: -1.219482, lat: 47.413220 },
      //   { name: 'Krueger-Z', lng: -1.209482, lat: 47.413220 },
      //   { name: 'Deneb', lng: -1.199482, lat: 47.413220 }
      // ],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.413220, -1.219482],
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 64
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  },
  methods: {
    updateBike (bike) {
      this.$emit('update', bike)
    },
    deleteBike (id) {
      this.$emit('delete', id)
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  },
  props: {
      bikes: Array
  }
}
</script>

<style scoped>
.someExtraClass {
  background-color: aqua;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 0 20px 20px 20px;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
}
l-popup {
  display: none;

}
.marker {
  margin: 25px 0 0 -5px;
  width: 40px;
}
</style>
