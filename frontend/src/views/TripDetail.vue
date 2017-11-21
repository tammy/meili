<template>
  <div class="full-width">
      <input type="text" class="text-center title textbox" v-model="trip.name" placeholder="The best trip ever!"/>
      <div class="online-panel">
        <collaborators/>
      </div>
      <div class="trip-details">
        <timeline :trip="trip" class="col-sm-5 timeline"></timeline>
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

import { getTripSocket } from '../../utils/socket';
import { getUserName, getProfileThumbnailUrl } from '../../utils/auth';

export default {
  name: 'trip-detail',
  components: {
    Timeline,
    CardDetailView,
    Collaborators,
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
  border: 1px solid black;
  width: 600px;
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
  padding: 0 30px;
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
