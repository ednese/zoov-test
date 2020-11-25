<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Map :bikes="bikes" @delete="deleteBike" @update="updateComponent"/>
    <Update v-if="update.toggle" :bike="update.value" @update="updateBike"/>
    <button v-on:click="addBike">Add</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import Map from './components/Map/Map.vue'
import Update from './components/Update/Update.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    Map,
    Update
  },
  mounted(){
    
    fetch("https://jsonbox.io/box_b69b3da57840514863a4")
    .then(response => response.json())
    .then(json => {
      this.bikes = json;
    })
  },
  methods: {
    addBike: function () {
      const data = {
        serial_number: "JZ345V",
        location: {
          type: "Point",
          coordinates: [2.24356, 48.7723]
        },
        in_order: true,
        service_status: 2,
        battery_level: 54
      }
      const link = "https://jsonbox.io/box_b69b3da57840514863a4";
      this.bikes = [...this.bikes, data];
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
    updateBike: function (data) {
      const tmp = [...this.bikes];
      this.bikes = tmp.map(bike => {
        if (bike._id === data.id)
          return data.value;
        else
            return bike;
      })
      this.update.toggle = false;
    },
    deleteBike: function (id) {
      const link = "https://jsonbox.io/box_b69b3da57840514863a4/" + id;
      const tmp = [...this.bikes];
      this.bikes = tmp.filter(bike => bike._id !== id)
      fetch(link, {method: 'DELETE'})
    }
  },
  data () {
    return {
      active: false,
      update: {toggle: false, value: {}},
      bikes: []
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
#app {
  font-family: 'Quicksand', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
textarea:focus, input:focus, button, select, select:hover {
  outline: none;
}
</style>
