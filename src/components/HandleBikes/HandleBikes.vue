<template>
  <div class="handleBikes">
    <div  v-if="!this.toggle" class="h-container h-empty zoov-container">
        Aucun vélo n'est sélectionné
    </div>
    <div v-else class="h-container zoov-container">
        <div class="h-container--states">
          <div class="h-top">
            <h1 class="h-title h-serial_number">{{item.serial_number}}</h1>
            <h4 class="h-battery">{{item.battery_level}}%</h4>
            <v-slider class="h-slider" v-model="item.battery_level" thumb-color='red darken-2' track-color='red darken-2'></v-slider>
          </div>
          <h2 class="h-title h-subtitle">En ordre:</h2>
          <v-radio-group v-model="item.in_order" row>
              <v-radio label="oui" :value=true color="green"/>
              <v-radio label="non" :value=false color="red darken-3"/>
          </v-radio-group>
          <div class="h-coord">
            <h2 class="h-title h-subtitle">Coordonnées:</h2>
            <div class="h-fields">
              <v-text-field style="margin-top: 20px" :rules="rules" label="Latitude" outlined v-model="item.location.coordinates[0]" hide-details="auto" />
              <v-text-field style="margin: 20px 0" :rules="rules" label="Longitude" outlined v-model="item.location.coordinates[1]" hide-details="auto" />
            </div>
          </div>
          <h2 class="h-title h-subtitle">Status:</h2>
          <v-radio-group v-model="item.service_status" row >
              <v-radio label="libre" :value=1 color="blue" />
              <v-radio label="réservé" :value=2 color="orange" />
              <v-radio label="utilisé" :value=3 color="red darken-2" />
          </v-radio-group>
        </div>
        <div class="h-img--container">
            <img src="../../assets/bike.jpg" alt="bike" class="h-img--bike" />
        </div>
        <div class="h-buttons normal">
          <v-btn class="ma-2" :loading="loading" :disabled="loading" color="info" @click="loader = 'loading'">MODIFIER DANS LA BASE DE DONNÉES
              <template v-slot:loader> <span class="custom-loader"> <v-icon light>mdi-cached</v-icon> </span> </template>
          </v-btn>
          <v-btn  color="error" v-on:click="deleteBike" >SUPPRIMER </v-btn>
        </div>
        <div class="h-buttons small">
          <v-btn x-small class="ma-2" :loading="loading" :disabled="loading" color="info" @click="loader = 'loading'">MODIFIER DANS LA BASE DE DONNÉES
              <template v-slot:loader> <span class="custom-loader"> <v-icon light>mdi-cached</v-icon> </span> </template>
          </v-btn>
          <v-btn  color="error" v-on:click="deleteBike" x-small>SUPPRIMER </v-btn>
        </div>
    </div>
  </div>
</template>

<script>
// STYLE
import './HandleBikes.css';

export default {
  name: 'HandleBikes',
  props: {
    item: Object,
    toggle: Boolean,
    bikes: Array
  },
  data: () => ({
    loader: null,
    loading: false,
    option: [true, false],
    rules: [
        value => !!value || "Ce champ n'a pas été remplie !",
        value => (!isNaN(value)) || "Vous devez rentrer un nombre !",
        value => (value && value < 999) || 'Le nombre que vous avez rentré est trop grand !',
      ],
  }),
  methods: {
    update: function () {
      const data = {
        serial_number: this.item.serial_number,
        location: {
          type: "Point",
          coordinates: [this.item.location.coordinates[0], this.item.location.coordinates[1]]
        },
        in_order: this.item.in_order,
        service_status: this.item.service_status,
        battery_level: this.item.battery_level
      }
      const link = "https://jsonbox.io/box_6da2f060d93632fac7f1/" + this.item._id;
      fetch(link, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
          },
        body: JSON.stringify(data)
      });
    },
    deleteBike: function () {
      if (window.confirm('Êtes vous sur de vouloir supprimer cet élément de la base de données?')) {
        this.$emit('delete', this.item.serial_number)
      }
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        this.update();
        setTimeout(() => (this[l] = false), 500)
        this.loader = null
      },
  }
}
</script>
