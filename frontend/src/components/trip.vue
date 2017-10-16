<template>
  <div class="full-width">
    <app-nav></app-nav>
    <div class="container align-left">
      <button type="button" class="btn btn-add" v-on:click="addEvent()">Add Event</button>
    </div>
    <div class="whitespace-top">
      <timeline class="col-sm-4"></timeline>
      <card-detail-view class="col-sm-8"></card-detail-view>
    </div>
  </div>
</template>

<script>
import AppNav from './appNav';
import Timeline from './Timeline';
import CardDetailView from './cardDetailView';

export default {
  name: 'trip',
  components: {
    AppNav,
    Timeline,
    CardDetailView,
  },
  data() {
  },
  methods: {
    addEvent() {
    },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-width {
  margin: 0 100px;
  width: calc(100% - 200px);
}

.whitespace-top {
  margin-top: 50px;
}

.align-left {
  margin: 10px 100px;
  text-align: left;
}

.btn-add {
  color: #31708f;
  background-color: transparent;
  border-color: #bce8f1;
}

.btn-add:hover {
  background-color: #bce8f1;
}
</style>
