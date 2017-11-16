<!-- HTML -->
<template>
  <div>
      <h1>this is the map</h1>
      <!-- <div id="locationField"> -->
        <input id="autocomplete" placeholder="Enter a city" type="text" />
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
      map: null,
      bounds: null,
      markers: [],
      autocomplete: null,
    }
  },
  computed: {
    event() {
      return this.$store.state.focusedEvent;
    },
  },
  methods: {
    focusEvent(marker) {
      this.$store.commit('setFocusedEvent', marker.event);
    },
    onPlaceChanged() {
      var place = this.autocomplete.getPlace();
      if (place.geometry) {
        // remove current marker
        if (this.event.marker) {
          this.event.marker.setMap(null);
          this.remove(this.markers, this.event.marker);
        }
        // place new marker 
        this.dropPin();
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
      }
    },
    dropPin() {
      const position = this.autocomplete.getPlace().geometry.location;

      this.event.marker = new google.maps.Marker({
        position,
        map: this.map,
        // label: 'Albert',
        animation: google.maps.Animation.DROP
      });

      this.event.marker.event = this.event;

      // add listener to map pins to change focused event on click
      var mapThis = this;
      google.maps.event.addListener(this.event.marker, 'click', function() {
        mapThis.focusEvent(this);
      });

      this.markers.push(this.event.marker);
      this.map.fitBounds(this.bounds.extend(position));

      this.fitBounds();
    },
    fitBounds() {
      var bounds = new google.maps.LatLngBounds();

      for (var i=0; i<this.markers.length; i++) {
          if(this.markers[i].getVisible()) {
              bounds.extend( this.markers[i].getPosition() );
          }
      }

      this.map.fitBounds(bounds);
    },
    remove(array, element) {
      const index = array.indexOf(element);
      
      if (index !== -1) {
          array.splice(index, 1);
      }
    },
  },
  mounted: function () {

    this.bounds = new google.maps.LatLngBounds();

    const element = document.getElementById('mapview')
    const mapCentre = new google.maps.LatLng(41.290851, -101.827431)
    const options = {
      zoom: 3,
      center: mapCentre
    }

    this.map = new google.maps.Map(element, options);

    // Create the autocomplete object and associate it with the UI input control.
    this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
            document.getElementById('autocomplete')), {
          // types: ['geocode']
        });

    this.autocomplete.addListener('place_changed', this.onPlaceChanged);

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
