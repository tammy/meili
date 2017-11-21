<!-- HTML -->
<template>
  <div>
      <!-- <div id="locationField"> -->
        <!-- <input id="autocomplete" placeholder="Enter a city" type="text" /> -->
      <!-- </div>  -->
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
      // bounds: null,
      mapMarkers: [],
      // autocomplete: null,
    }
  },
  computed: {
    // map() {
    //   return this.$store.state.trip.map;
    // },
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
    events: {
        handler: function(oldValue, newValue) {
            console.log("deep change");

            for (var i=0; i<oldValue.length; i++) {
              console.log(oldValue);
              console.log("new lat: " +newValue[i]);
              if (oldValue[i].marker !== newValue[i].marker) {
                console.log('marker not eq');
                this.fitBounds();
              }
            }
        },
        deep: true
    },
    markers: function() {
      console.log('MARKER CHANGE');
      this.fitBounds();
    }
  },
  updated() {
    this.fitBounds();
  },
  methods: {
    focusEvent(marker) {
      this.$store.commit('setFocusedEvent', marker.event);
    },
    fitBounds() {
      if (!this.markers || this.markers.length === 0) return;

      var bounds = new google.maps.LatLngBounds();

      // for (var i=0; i<this.markers.length; i++) {
      //   if (this.markers[i]) {
      //     console.log("i");
      //     this.markers[i].setMap(this.map);
      //     this.markers[i].show;
      //     bounds.extend( this.markers[i].getPosition() );
      //   }

      //   // add listener to map pins to change focused event on click
      //   // var mapThis = this;
      //   // google.maps.event.addListener(this.markers[i], 'click', function() {
      //   //   mapThis.focusEvent(this);
      //   // });
      // }

      // remove oldmarkers
      for (var i=0; i<this.mapMarkers.length; i++) {
        console.log('r');
        this.mapMarkers[i].setMap(null);
      }

      this.mapMarkers = [];

      for (var i=0; i<this.events.length; i++) {
        if (this.events[i].marker) {
          console.log("i ");
          const marker = new google.maps.Marker({
            position: this.events[i].marker,
            map: this.map,
            // label: 'Albert',
            animation: google.maps.Animation.DROP
          });
          // this.events[i].marker.setMap(this.map);
          // this.events[i].marker.show;
          this.mapMarkers.push(marker);
          bounds.extend( marker.getPosition() );
        }
      }

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
  height: 300px;
  /*margin: 0 auto;*/
  background: lightgrey;
}

</style>
