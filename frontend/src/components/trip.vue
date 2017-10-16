<template>
  <div class="full-width">
    <app-nav></app-nav>
    <input type="text" class="text-center title textbox" v-model="tripName" placeholder="The best trip ever!s"/>
    <div class="whitespace-top">
      <timeline class="col-sm-5"></timeline>
      <card-detail-view class="col-sm-7"></card-detail-view>
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
    return {
      tripName: 'Graduation - Paris, France',
    };
  },
  methods: {
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

.textbox {
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
  width: calc(100% - 25px);
  border: none;
  font-size: 18px;
  min-height: 20px;
}

.title {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
}
</style>
