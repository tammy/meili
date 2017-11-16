<!-- HTML -->
<template>
  <div>
    <div class="panel panel-detailed">
      <div class="panel-heading"> 
        <h3 class="panel-title"> 
          <input type="text" class="textbox text-center" v-model="event.title" placeholder="Event">
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
          <input id="autocomplete" type="text" class="textbox" v-model="event.location" placeholder="Location"/>
        </p>
        <p class="field">
          <div class="glyphicon glyphicon-time"></div>
          <input class="textbox" v-model="event.startTime" placeholder="Time"/>
        </p>
        <p class="field"> 
          <div class="glyphicon glyphicon-pencil"></div>
          <input type="text" class="textbox" v-model="event.description" placeholder="Notes"></input>
        </p>
      </div>
    </div>
  </div>
</template>

<!-- JavaScript -->
<script>

export default {
  name: 'card-detail-view',
  components: {
  },
  data: function () {
    return {
      autocomplete: null,
    }
  },
  computed: {
    map() {
      return this.$store.state.trip.map;
    },
    markers() {
      return this.$store.state.trip.markers;
    },
    event() {
      return this.$store.state.focusedEvent;
    },
  },
  methods: {
    search() {},
    save() {
      // TODO: make this periodically save automatically
      this.$store.dispatch('saveEvent', this.event);
    },
    onPlaceChanged() {
      var place = this.autocomplete.getPlace();
      this.event.location = place.formatted_address;

      if (place.geometry) {
        // remove current marker
        if (this.event.marker) {
          console.log("r");
          this.$store.commit('removeMarker', this.event.marker);
          this.event.marker.setMap(null);
          this.event.marker = null;
        }
        // place new marker 
        // this.event.marker = new google.maps.Marker();
        // this.event.marker.setPosition(place.geometry.location);
        // this.event.marker.setMap(this.map);
        // this.event.marker.setAnimation(google.maps.Animation.DROP);

        this.event.marker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          // label: 'Albert',
          animation: google.maps.Animation.DROP
        });

        this.$store.commit('addMarker', this.event.marker);
        console.log(this.markers.length);

      } else {
        document.getElementById('autocomplete').placeholder = 'Location';
      }
    },
  },
  mounted: function() {
    // Create the autocomplete object and associate it with the UI input control.
    this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
            document.getElementById('autocomplete')), {
          // types: ['geocode']
        });

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
  width: calc(100% - 40px);
  border: none;
  font-size: 18px;
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
