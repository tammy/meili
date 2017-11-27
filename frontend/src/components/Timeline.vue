<template>
  <div class="margin-box">
    <div class="align-left">
      <button type="button" class="btn btn-add" v-on:click="add()">Add Event</button>
    </div>
    <div class="timeline">
      <div class="timeline-container">
        <ul>
          <draggable v-model="trip.events" :options="{handle:'.handle'}">
    	      <li v-for="event in trip.events"><span></span>
              <div>
                <card :tripEvent="event"></card>
              </div>
              <span class="number">
                <span v-if="event.startTime"> {{ formatDate(event.startTime) }} </span> <span></span>
              </span>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import Card from './Card';

export default {
  name: 'timeline',
  components: { Card, Draggable },
  props: ['trip'],
  computed: {
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const strDate = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
      return strDate;
    },
    add() {
      this.$store.commit('addEvent');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-box {
  margin-bottom: 20px;
}

.timeline {
  text-align: left;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 0 30px 25px;
  max-height: 100%;
  margin-bottom: 15px;
}

body {
  height: 100vh;
  font-family: "Open Sans", sans-serif;
}

.align-left {
  margin: 10px 10px;
  text-align: left;
}

.btn {
  margin-right: 10px;
}

.btn-add {
  color: #31708f;
  background-color: transparent;
  border-color: #bce8f1;
}

.btn-add:hover {
  background-color: #bce8f1;
}

.timeline-container ul {
  margin: 0;
  list-style: none;
  position: relative;
  padding: 1px 10px;
  font-size: 13px;
}
.timeline-container ul:before {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  border-left: 2px dashed #31708f;
}
.timeline-container ul li {
  position: relative;
  margin-left: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1px;
  border-radius: 6px;
}
.timeline-container ul li:not(:first-child) {
  margin-top: 60px;
}
.timeline-container ul li > span {
  width: 2px;
  height: 100%;
  background: #31708f;
  left: -30px;
  top: 0;
  position: absolute;
}
.timeline-container ul li > span:before, .timeline-container ul li > span:after {
  content: "";
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 2px solid #31708f;
  position: absolute;
  background: #bce8f1;
  left: -4px;
  top: 0;
}
.timeline-container ul li span:after {
  top: 100%;
}
.timeline-container ul li > div {
  margin-left: 10px;
}
.timeline-container div .title, .timeline-container div .type {
  font-weight: 600;
  font-size: 12px;
}
.timeline-container div .info {
  font-weight: 300;
}
.timeline-container div > div {
  margin-top: 5px;
}
.timeline-container span.number {
  height: 100%;
}
.timeline-container span.number span {
  position: absolute;
  font-size: 10px;
  left: -35px;
  font-weight: bold;
}
.timeline-container span.number span:first-child {
  top: 0;
}
.timeline-container span.number span:last-child {
  top: 100%;
}
</style>
