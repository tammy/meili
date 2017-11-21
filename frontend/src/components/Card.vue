<!-- HTML -->
<template>
  <div>
      <div class="panel panel-event" v-on:click="focusEvent()">
        <div class="panel-heading">
          <h3 class="panel-title">
            <input type="text" class="textbox text-center" v-model="tripEvent.title" placeholder="Event Name"/>
            <div class="glyphicon glyphicon-resize-vertical handle"></div>
          </h3>
        </div>
        <div class="panel-body text-left" v-show="showDetails">
          <p v-show="tripEvent.location">{{ tripEvent.location }}</p>
          <p v-show="tripEvent.startTime">{{ tripEvent.startTime }}</p>
          <p v-show="tripEvent.description">{{ tripEvent.description }}</p>
        </div>
      </div>
      <div class="glyphicon glyphicon-remove" v-on:click="remove()"></div>
  </div>
</template>

<!-- JavaScript -->
<script>

export default {
  name: 'card',
  props: ['tripEvent'],
  computed: {
    showDetails() {
      return this.tripEvent.location || this.tripEvent.startTime || this.tripEvent.description;
    },
  },
  methods: {
    remove() {
      this.$store.dispatch('removeEvent', this.tripEvent);
    },
    focusEvent() {
      this.$store.dispatch('setFocusedEvent', this.tripEvent);
    },
  },
};
</script>

<!-- CSS -->
<style scoped>
.panel {
  border-radius: 0;
  border-color: #bce8f1;
  width: 400px;
  margin-bottom: 0px;
  display: inline-block;
  transition: box-shadow .3s;
  cursor: pointer;
}

.panel:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

.panel-heading {
  color: #31708f;
  background-color: transparent;
  border-color: #bce8f1;
}

p {
  font-size: 16px;
  vertical-align: middle;
  padding-left: 5px;
}

input {
  background-color: transparent;
  padding-left: 5px;
  border: none;
}

input:focus {
  background-color: #fff;
  outline: none;
  border: none;
}

.textbox {
  padding-left: 5px;
  padding-right: 5px;
  width: calc(100% - 25px);
  font-size: 18px;
  min-height: 20px;
  outline: none;
}

.glyphicon-remove {
  position: absolute;
  top: 10px;
  padding-left: 10px;
  color: transparent;
}

.glyphicon-remove:hover {
  color: red;
}
</style>
