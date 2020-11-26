<template>
  <v-app>
    <v-app-bar
      app
      color="#33c5ff"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo-zoov.png"
          transition="scale-transition"
          width="200"
        />
      </div>
    </v-app-bar>
    <v-main>
      <HandleBikes @delete="deleteBike" :item="update.value" :toggle="update.toggle" :bikes="bikes"/>
      <Map :bikes="bikes" @update="updateComponent"/>
      <AddBike @add="addBike" :bikes="bikes"/>
    </v-main>
  </v-app>
</template>

<script>
// COMPONENTS
import Map from './components/Map/Map.vue'
import HandleBikes from './components/HandleBikes/HandleBikes.vue'
import AddBike from './components/AddBike/AddBike.vue'

// STYLE
import './Style.css';

export default {
  name: 'App',
  components: {
    HandleBikes,
    Map,
    AddBike
  },
  mounted(){
    fetch("https://jsonbox.io/box_6da2f060d93632fac7f1")
    .then(response => response.json())
    .then(json => {
      this.bikes = json;
    })
  },
  methods: {
    addBike: function (data) {
      const link = "https://jsonbox.io/box_6da2f060d93632fac7f1";
      this.bikes = [...this.bikes, { ...data }];
      fetch(link, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
          },
        body: JSON.stringify(data)
      })
    },
    updateComponent: function (bike) {
      this.update.toggle = true;
      this.update.value = bike;
    },
    deleteBike: function (serial_number) {
      const link = "https://jsonbox.io/box_6da2f060d93632fac7f1/?q=serial_number:" + serial_number;
      const tmp = [...this.bikes];
      this.bikes = tmp.filter(bike => bike.serial_number !== serial_number)
      fetch(link, {method: 'DELETE'})
      this.update.toggle = false;
    }
  },
  data: () => ({
    active: false,
    update: {toggle: false, service_status: '', value: {location: {coordinates: []}}},
    bikes: []
  }),
};
</script>