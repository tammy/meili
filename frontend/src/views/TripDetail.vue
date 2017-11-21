<template>
  <div class="full-width">
    <online-now/>
    <input type="text" class="text-center title textbox" v-model="trip.name" placeholder="The best trip ever!"/>
    <div class="whitespace-top">
      <timeline :trip="trip" class="col-sm-5"></timeline>
      <card-detail-view class="col-sm-7"></card-detail-view>
    </div>
  </div>
</template>

<script>
import Timeline from '../components/Timeline';
import CardDetailView from '../components/CardDetailView';
import OnlineNow from '../components/OnlineNow';

import {getTripSocket} from '../../utils/socket';
import {getUserName, getProfileThumbnailUrl} from '../../utils/auth';

export default {
  name: 'trip-detail',
  components: {
    Timeline,
    CardDetailView,
    OnlineNow,
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
    var tok = localStorage.getItem('id_token');
    if (!tok) {
      tok = 'Unknown user';
    }

    getTripSocket().emit('newConnection', {
      userID: tok,
      tripID: this.$route.params.id,
      userName: getUserName(),
      profileImageUrl: getProfileThumbnailUrl(),
    });

    console.log('Connecting to trip');
  },

  destroyed() {
    getTripSocket().emit('removeConnection', {});
    console.log('Disconnecting from trip');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  font-size: 24px;
  font-weight: 600;
}
</style>
