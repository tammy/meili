<template>
  <div class="full-width">
      <input type="text" class="text-center title textbox" v-model="trip.name" placeholder="The best trip ever!"/>
      <div class="online-panel">
        <collaborators/>
      </div>
      <div class="trip-details">
        <timeline :trip="trip" class="col-sm-5 timeline"></timeline>
        <map-view class="col-sm-7"></map-view>
        <div class="col-sm-7 right-pane">
          <card-detail-view></card-detail-view>
        </div>
      </div>
  </div>
</template>

<script>
import Timeline from '../components/Timeline';
import CardDetailView from '../components/CardDetailView';
import Collaborators from '../components/Collaborators';
import MapView from '../components/MapView';

import { getTripSocket } from '../../utils/socket';
import { getUserName, getProfileThumbnailUrl } from '../../utils/auth';

export default {
  name: 'trip-detail',
  components: {
    Timeline,
    CardDetailView,
    Collaborators,
    MapView,
  },
  computed: {
    trip() {
      return this.$store.state.trip;
    },
    tripID() {
      return this.$route.params.id;
    },
  },
  created() {
    let tok = localStorage.getItem('id_token');
    if (!tok) {
      tok = 'Unknown user';
    }

    getTripSocket().emit('newConnection', {
      userID: tok,
      tripID: this.tripID,
      userName: getUserName(),
      profileImageUrl: getProfileThumbnailUrl(),
    });

    console.log('Connecting to trip');
  },
  destroyed() {
    getTripSocket().emit('removeConnection', {});
    console.log('Disconnecting from trip');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeline {
  width: 600px;
  box-shadow: 0 0 11px rgba(33,33,33,.2);
  overflow-y: hidden;
}

.online-panel {
  width: 50px;
  float: left;
}

.trip-details {
  float: left;
  padding-left: 20px;
  width: calc(100% - 50px);
}

.right-pane {
  box-shadow: 0 0 11px rgba(33,33,33,.2);
  padding: 30px 35px;
  width: calc(100% - 630px);
  margin-left: 30px;
}

.full-width {
  padding: 0 30px;
  width: 100%;
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
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}
</style>
