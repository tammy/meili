<!-- HTML -->
<template>
  <div>
    <div class="panel panel-detailed">
      <div class="panel-heading">
        <h3 class="panel-title">
          <input type="text" v-bind:readonly="isReadOnly" class="textbox text-center" v-model="event.title" placeholder="Event">
            <button class="glyphicon glyphicon-search search"
              v-show="event.focused && event.name"
              v-on:click="search()"
              ></button>
            </input>
        </h3>
      </div>
      <div class="panel-body text-left">
        <p class="field">
          <div class="glyphicon glyphicon-pushpin"></div>
          <input id="autocomplete" type="text" class="textbox" v-bind:readonly="isReadOnly" v-model="event.location" placeholder="Location"/>
        </p>
        <p class="field">
          <div class="glyphicon glyphicon-time"></div>
          <date-picker class="textbox" v-bind:readonly="isReadOnly" v-model="event.datetime" :config="config" placeholder="Date & Time" @dp-hide="commitDatetime">
          </date-picker>
        </p>
        <p class="field">
          <div class="glyphicon glyphicon-pencil"></div>
          <input type="text" class="textbox" v-bind:readonly="isReadOnly" v-model="event.description" placeholder="Notes"></input>
        </p>
      </div>
    </div>
    <thread :eventID="event.id"></thread>
    <!-- <button type="button" class="btn btn-success" v-on:click="save()">Save</button> -->
  </div>
</template>

<!-- JavaScript -->
<script>
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import DatePicker from 'vue-bootstrap-datetimepicker';
import Thread from './Thread';

export default {
  name: 'card-detail-view',
  components: { Thread, DatePicker },
  data() {
    return {
      config: {
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      autocomplete: null,
    };
  },
  computed: {
    markers() {
      return this.$store.state.trip.markers;
    },
    event() {
      // Sometimes this returns null. Didnt bother digging into it.
      const ev = this.$store.getters.getFocusedEvent;
      if (!ev) {
        return {};
      }

      ev.datetime = new Date(ev.startTime);
      return ev;
    },
    isReadOnly() {
      return this.$store.getters.getUserReadOnly;
    },
  },
  methods: {
    search() {},
    save() {
      // TODO: make this periodically save automatically
      this.$store.dispatch('saveEvent', this.event);
    },
    onPlaceChanged() {
      const place = this.autocomplete.getPlace();

      if (place.geometry) {
        this.event.location = place.formatted_address;

        if (this.event.marker) {
          this.$store.commit('removeMarker', this.event.marker);
          this.event.marker = null;
        }

        this.event.marker = place.geometry.location;
        this.event.coordinateLat = place.geometry.location.lat();
        this.event.coordinateLon = place.geometry.location.lng();

        this.$store.commit('addMarker', this.event.marker);
      }
    },
    commitDatetime() {
      this.event.startTime = this.event.datetime;
    },
  },
  mounted: function() {
    this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
            document.getElementById('autocomplete')), {});

    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  },
};
</script>

<!-- CSS -->
<style scoped>
.panel {
  border-radius: 0;
  border-color: #bce8f1;
  max-width: 350px;
  margin-top: 5px;
}

.panel-detailed {
  border-radius: 0;
  max-width: 100%;
}

.panel-heading {
  color: #31708f;
  background-color: transparent;
  border-color: #bce8f1;
}

.field {
  display: inline-block;
  min-width: 10px;
  padding: 0 7px;
  font-size: 16px;
  text-align: left;
  vertical-align: middle;
  background-color: #FFF;
  color: #000;
}

input {
  background-color: transparent;
}

input:focus {
  outline: none;
}

.panel-title .textbox {
  margin-right: 10px;
}

.textbox {
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
  width: calc(100% - 40px) !important;
  border: none;
  font-size: 18px;
  display: inline-block;
  box-shadow: none !important;
}

.title {
  width: 100%;
  font-size: 24px;
}

.search {
  padding: 0;
  display: inline-block;
  float: right;
  margin: 0;
  border-width: 0;
  background-color: transparent;
}
</style>
