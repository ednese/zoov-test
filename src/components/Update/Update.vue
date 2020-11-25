<template>
  <div class="update">
    <form class="form">
        <div class="lat">
        <label>lat</label>
        <input class="lat"/>
        </div>
        <div class="long">
        <label>long</label>
        <input class="long"/>
        </div>
    </form>
    <h2>Status </h2>
    <div v-on:click="active = !active" class="select" id="nav__lang">
        click
        <!-- <img class="nav__lang__img" src="../../assets/icones/ARROW.svg" alt="logo"/> -->
        <div v-if="active">true</div>
        <div v-if="active">false</div>
    </div>
    <div>
        <p>free: <input type="radio" name="status" checked/></p>
        <p>booked: <input type="radio" name="status"/></p>
        <p>in use: <input type="radio" name="status"/></p>
    </div>
    <button v-on:click="updateBike({} ,'')">UPDATE</button> 
  </div>
</template>

<script>
export default {
  name: 'Update',
  props: {
    bike: Object
  },
  methods: {
    updateBike: function (data, id) {
      id = "5fbd622b117c720017d36f77";
      data = {
          value: {
              serial_number:"EVAN06",
                location:{
                    type:"Point",
                    coordinates:[48.6566,2.30085]},
                in_order:true,
                service_status:2,
                battery_level:94
          },
          id: id
      };
      const link = "https://jsonbox.io/box_b69b3da57840514863a4/" + id;
      fetch(link, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
          },
        body: JSON.stringify(data.value)
      })
      this.$emit('update', data)
    },
  },
  data () {
      console.log(this.bike)
      return {
          active: false,
          selected: false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
