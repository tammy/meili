<template>
  <div class="full-width">
    <!-- Section for all trips -->
    <h1 class="text-left">Trips</h1>
    <div class="whitespace-top flex-list">
      <div class="flex-box" v-for="trip in tripsList">
          <div class="box">
            <div class="item" v-on:click="goToTrip(trip.id)">
            <!-- Not sure if there's a better way to only render the source tag if the value is not null or blank -->
            <img v-if="!trip.picture" class="photo" v-bind:class="{ 'default-picture': !trip.picture }"/>
            <img v-else class="photo" v-bind:class="{ 'default-picture': !trip.picture }" :src="trip.picture"/>
            {{ trip.name }}
            </div>
          </div>
      </div>
    </div>
    <div class="col-xs-12" style="margin-top: 20px">
      <button class="btn btn-success" v-on:click="showNewTripModal()">Create a new adventure</button>
    </div>

    <modal name="new-trip" height="auto">
      <div style="padding: 20px 30px">
        <h4>New Trip</h4>
        <hr/>
        <input type="text" v-model="newTrip.name" placeholder="Trip name (ex. The best trip ever!)"></input>
        <input type="text" v-model="newTrip.picture" placeholder="Photo URL (ex. http://www.photos.com/myphoto.jpg)"></input>
        <div class="col-xs-12 text-center" style="margin: 10px 0">
          <button class="btn btn-success" v-on:click="createTrip()">Create</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'trips-list',
  data() {
    return {
      defaultPicture: '',
      newTrip: {
        name: null,
        description: null,
        picture: null,
      },
      success: false,
      error: false,
    };
  },
  computed: {
    tripsList() {
      return this.$store.state.tripsList;
    },
  },
  methods: {
    goToTrip(tripID) {
      this.$router.push({
        name: 'TripDetail',
        params: { id: tripID },
      });
    },
    createTrip() {
      this.$store.dispatch('createTrip', this.newTrip).then(
        (response) => {
          this.success = true;
        },
        (error) => {
          this.error = true;
      });
      this.$modal.hide('new-trip');
    },
    showNewTripModal() {
      this.$modal.show('new-trip');
    },
  },
  mounted() {
    this.$store.dispatch('getTripsList');
  },
};
</script>

<style scoped>
input {
  width: calc(100% - 20px);
  margin: 10px 10px 30px 10px;
  border: none;
  border-bottom: 3px dashed #bce8f1;
  height: 34px;
}

input:focus {
  outline: none;
}

hr {
  border-color: #bce8f1;
}

h1 {
  margin-left: 20px;
}

.flex-list {
  display: flex;
  flex-wrap: wrap;
}

.flex-box {
  flex: 0 0 345px;
  height: 400px;
  margin: 7px;
}

.full-width {
  padding: 0 30px;
  width: 100%;
}

.photo {
  height: 85%;
  width: calc(100% - 10px);
  margin-bottom: 25px;
  border: 1px solid #bce8f1;
}

.item {
  margin: 10px 0;
  padding: 20px;
  height: 400px;
  color: #31708f;
  background-color: transparent;
  border: 1px solid #bce8f1;
  cursor: pointer;
}

.item:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

.hidden-hover {
  border: none;
  color: transparent;
}

.hidden-hover:hover {
  color: green;
  border: 1px solid green;
}

.glyphicon-plus {
  margin: 20% 0;
  font-size: 20px;
}

.box {
  font-size: 13pt;
  font-weight: 500;
}

/* Source: http://lea.verou.me/css3patterns/#madras */
.default-picture {
  background-color: #bce8f1;
  background-image: repeating-linear-gradient(
    45deg, transparent, transparent 35px, 
    rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px);
  border-color: #bce8f1;
}
</style>
