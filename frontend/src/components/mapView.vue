<!-- HTML -->
<template>
  <div>
      <h1>this is the map</h1>
      <!-- <div id="locationField"> -->
        <!-- <input id="autocomplete" placeholder="Enter a city" type="text" /> -->
      <!-- </div> -->
      <div id="mapview"></div>
  </div>
</template>

<!-- JavaScript -->
<script>
export default {
  name: 'map-view',
  methods: {
    initMap() {
      
    },
  },
  data: function () {
    return {
      // map: null,
      // bounds: null,
      // markers: [],
      // autocomplete: null,
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
    events() {
      return this.$store.state.trip.events;
    },
  },
  watch: {
    markers: function() {
      this.fitBounds();
    },
  },
  methods: {
    focusEvent(marker) {
      this.$store.commit('setFocusedEvent', marker.event);
    },
    fitBounds() {
      if (!this.events || this.events.length === 0) return;

      var bounds = new google.maps.LatLngBounds();

      for (var i=0; i<this.events.length; i++) {
        // this.markers[i].setMap(this.map);
        if (this.events[i].marker) {
          console.log("i");
          bounds.extend( this.events[i].marker.getPosition() );
        }

        // add listener to map pins to change focused event on click
        // var mapThis = this;
        // google.maps.event.addListener(this.markers[i], 'click', function() {
        //   mapThis.focusEvent(this);
        // });
      }

      this.map.fitBounds(bounds);
    },
  },
  mounted: function () {
    const element = document.getElementById('mapview')
    const mapCentre = new google.maps.LatLng(41.290851, -101.827431)
    const options = {
      zoom: 3,
      center: mapCentre
    }

    const map = new google.maps.Map(element, options);
    this.$store.commit('setMap', map);

    this.fitBounds();
  }
};
</script>

<!-- CSS -->
<style scoped>

#mapview {
  width: 100%;
  height: 400px;
  background-color: lightgrey;
}

#locationField {
  width: 190px;
  height: 25px;
  background-color: #fff;
}

#autocomplete {
  width: 100%;
}

.mapview {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}

</style>
