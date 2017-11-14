<template>
  <div class="full-width">
    <!-- Section for all trips -->
    <div class="whitespace-top">
      <div v-for="trip in tripsList">
          <div class="col-xs-3 box">
            <div class="item" v-on:click="goToTrip(trip.id)">
            {{ trip.name }}
            </div>
          </div>
      </div>
      <div class="col-xs-3 box">
        <div class="item hidden-hover" v-on:click="addTrip()">
          <div class="glyphicon glyphicon-plus"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  name: 'trips-list',
=======
import AppNav from '../components/AppNav';

export default {
  name: 'trips-list',
  components: { AppNav },
>>>>>>> Add a trip list view
  data() {
    return {
      tripsList: [
        {
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
<<<<<<< HEAD
=======
        },{
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
        },{
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
        },{
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
        },{
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
        },{
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
        },{
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
>>>>>>> Add a trip list view
        },
      ],
    };
  },
<<<<<<< HEAD
  methods: {
    goToTrip(tripID) {
      this.$router.push({
        name: 'TripDetail',
        params: { id: tripID },
      });
    },
    addTrip() {
      console.log('new trip');
      // TODO: open modal?
=======
  computed: {
    // tripsList() {
    //   return this.$store.dispatch('getTripList');
    // },
  },
  methods: {
    addTrip() {

>>>>>>> Add a trip list view
    },
  },
};
</script>

<style scoped>
.full-width {
  padding: 0 30px;
  width: 100%;
}

.item {
  margin: 10px 0;
  padding: 20px;
  min-height: 200px;
  color: #31708f;
  background-color: transparent;
  border: 1px solid #bce8f1;
  cursor: pointer;
}

.hidden-hover {
  border: none;
  color: transparent;
}

<<<<<<< HEAD
.hidden-hover:hover {
  color: green;
  border: 1px solid green;
=======
.glyphicon-remove:hover {
  color: green;
>>>>>>> Add a trip list view
}

.item:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

<<<<<<< HEAD
.glyphicon-plus {
  margin: 20% 0;
  font-size: 20px;
}
=======
>>>>>>> Add a trip list view
</style>
