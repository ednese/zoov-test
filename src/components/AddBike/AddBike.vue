<template>
  <div class="addBike">
    <v-form class="add-container zoov-container" ref="form" lazy-validation>
      <h1 class="a-title">Ajouter un vélo</h1>
      <div>
        <h2 class="a-title a-subtitle">Numéro et Batterie</h2>
        <div class="add-fields">
          <v-text-field style="margin-right: 50px" label="Numéro de série" outlined :rules="rules.serial"  v-model="data.serial_number" hide-details="auto" />
          <v-text-field label="Batterie" outlined :rules="rules.battery"  v-model="data.battery_level" hide-details="auto" />
        </div>
      </div>
      <div>
        <h2 class="a-title a-subtitle">Coordonnées</h2>
        <div class="add-fields">
          <v-text-field style="margin-right: 50px" label="Latitude" outlined :rules="rules.coord"  v-model="coord.lat" hide-details="auto" />
          <v-text-field label="Longitude" outlined :rules="rules.coord"  v-model="coord.lng" hide-details="auto" />
        </div>
      </div>
      <div>
        <div class="order">
          <h2 class="a-title a-subtitle">Le vélo est il en ordre?</h2>
          <v-select v-model="data.in_order" :items="order" label="Select" single-line/>
        </div>
        <div class="service_status">
          <h2 class="a-title a-subtitle">Status</h2>
          <v-select v-model="data.service_status" :items="status" label="Select" single-line/>
        </div>
        <div class="add-button">
          <v-btn class="ma-2 a-btn normal" color="info" @click="addBike">AJOUTER À LA BASE DE DONNÉES</v-btn>
          <v-btn class="ma-2 a-btn small" color="info" @click="addBike" x-small>AJOUTER À LA BASE DE DONNÉES</v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
// STYLE
import './Add.css';

export default {
  name: 'AddBike',
  props: {
    bikes: Array
  },
  methods: {
    addBike: function () {
      if (this.data.in_order === 'non')
        this.data.in_order = false;
      else if (this.data.in_order === 'oui')
        this.data.in_order = true;
      this.status.forEach((arg, i) => {
        if (arg === this.data.service_status)
          this.data.service_status = i + 1;
      })
      const doublon = this.bikes.map(bike => {
        if (bike.serial_number == this.data.serial_number)
          return 1;
        return 0;
      })
      if (doublon.includes(1))
        alert('Ce numéro de série est déjà enregistré.')
      else if (this.coord.lat && this.coord.lng && parseInt(this.coord.lat) && parseInt(this.coord.lng)) {
        if (this.data.serial_number.length == 6 && 0 <= this.data.battery_level
        && this.data.battery_level <= 100 && this.data.service_status && this.data.in_order !== undefined) {
          this.data.location.coordinates[0] = parseInt(this.coord.lat);
          this.data.location.coordinates[1] = parseInt(this.coord.lng);
          this.$emit('add', this.data);
          this.$refs.form.reset();
        }
        else
          alert("Réponse incorrecte ou incomplète.");
      }
      else
        alert("Les coordonnées sont incorrects.");
    }
  },
  data: () => ({
    loader: null,
    loading: false,
    coord: {
      lat: '',
      lng: ''
    },
    data: { serial_number: '', location: {type:"Point", coordinates: []} },
    order: ['oui', 'non'],
    status: ['libre', 'réservé', 'utilisé'],
    rules: {
      battery: [
        value => !!value || "Ce champ est vide.",
        value => (!isNaN(value)) || 'Vous devez rentrer un nombre !',
        value => (value && 0 <= value && value <= 100 ) || 'Le nombre doit être compris entre 0 et 100 !',
      ],
      serial: [
        value => !!value || "Ce champ n'a pas été remplie.",
        value => (value && value.length == 6) || 'Le numéro de série doit comporter 6 caractères.',
      ],
      coord: [
        value => !!value || "Ce champ n'a pas été remplie !",
        value => (!isNaN(value)) || "Vous devez rentrer un nombre !",
        value => (value && value < 999) || 'Le nombre que vous avez rentré est trop grand !',
      ],
    },
  }),
}
</script>
