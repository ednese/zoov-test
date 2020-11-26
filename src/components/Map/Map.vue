<template>
  <div class="Map">
    <v-img class="map-container zoov-container">
      <l-map style="height: 500px" :zoom="zoom" :center="center" :maxZoom="max" :minZoom="min">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker v-on:click="updateBike(bike)" v-for="bike in bikes" :lat-lng="bike.location.coordinates" :key="bike.name">
          <l-popup>
            {{bike.serial_number}}
            {{bike.battery_level}}%
          </l-popup>
          <l-icon
                    :icon-anchor="staticAnchor"
                    class-name="someExtraClass">
            <img class="marker" :src="require(`../../assets/marker_${bike.service_status}.png`)">
          </l-icon>
        </l-marker>
      </l-map>
    </v-img >
  </div>
</template>

<script>
// STYLE
import './Map.css';

// MAP
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
    const initCenter = () => {
      let tab = [47.413220, -1.219482];
      return tab;
    }
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      max: 10,
      min: 2,
      center: initCenter(),
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
