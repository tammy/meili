<template>
  <div class="full-width">
    <app-nav></app-nav>
    <!-- Section for all trips -->
    <div class="whitespace-top">
      <div v-for="trip in tripsList">
        <div class="col-xs-3 box">
          <div class="item">
          {{ trip.name }}
          </div>
        </div>
      </div>
      <div class="col-xs-3 box">
        <div class="item  hidden-hover" v-on:click="addTrip()">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from '../components/AppNav';

export default {
  name: 'trips-list',
  components: { AppNav },
  data() {
    return {
      tripsList: [
        {
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
        },{
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
        },
      ],
    };
  },
  computed: {
    // tripsList() {
    //   return this.$store.dispatch('getTripList');
    // },
  },
  methods: {
    addTrip() {

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

.glyphicon-remove:hover {
  color: green;
}

.item:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

</style>
