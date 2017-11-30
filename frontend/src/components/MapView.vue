<!-- HTML -->
<template>
  <div>
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
      map: null,
      mapMarkers: [],
    }
  },
  computed: {
    markers() {
      return this.$store.state.trip.markers;
    },
    // event() {
    //   return this.$store.state.focusedEvent;
    // },
    events() {
      return this.$store.state.trip.events;
    },
  },
  watch: {
    events: {
        handler: function(oldValue, newValue) {
            if (oldValue != newValue) {
              this.fitBounds();
            }
        },
        deep: true
    },
    markers: function() {
      this.fitBounds();
    },
    deep: true
  },
  methods: {
    // focusEvent(marker) {
    //   this.$store.commit('setFocusedEvent', marker.event);
    // },
    fitBounds() {
      if (!this.events || this.events.length === 0) return;

      var bounds = new google.maps.LatLngBounds();

      //   // add listener to map pins to change focused event on click
      //   // var mapThis = this;
      //   // google.maps.event.addListener(this.markers[i], 'click', function() {
      //   //   mapThis.focusEvent(this);
      //   // });
      // }

      // remove oldmarkers
      
      for (var i=0; i<this.mapMarkers.length; i++) {
        this.mapMarkers[i].setMap(null);
      }

      this.mapMarkers = [];

      for (var i=0; i<this.events.length; i++) {
        if (this.events[i].coordinateLat) {
          const position = new google.maps.LatLng(this.events[i].coordinateLat, this.events[i].coordinateLon);
          const marker = new google.maps.Marker({
            position,
            map: this.map,
            // label: 'Albert',
            animation: google.maps.Animation.DROP
          });
          this.mapMarkers.push(marker);
          bounds.extend( marker.getPosition() );
        }
      }

      // this.mapMarkers = [];
      // this.mapMarkers = newMarkers;

      this.map.fitBounds(bounds);
    },
  },
  mounted() {
    const element = document.getElementById('mapview')
    const mapCentre = new google.maps.LatLng(41.290851, -101.827431)
    const options = {
      zoom: 3,
      center: mapCentre
    }

    this.map = new google.maps.Map(element, options);

    this.fitBounds();
  }
};
</script>

<!-- CSS -->
<style scoped>

#locationField {
  width: 190px;
  height: 25px;
  background-color: #fff;
}

#autocomplete {
  width: 100%;
}

#mapview {
  border-radius: 0;
  border-color: #bce8f1;
  /*max-width: 400px;*/
  width: 100%;
  margin-top: 10px;
  height: 350px;
  /*margin: 0 auto;*/
  background: lightgrey;
}

</style>
