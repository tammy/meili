<template>
  <div>
    <div class="align-left">
      <button type="button" class="btn btn-success" v-on:click="save()">Save</button>
      <button type="button" class="btn btn-add" v-on:click="addEvent()">Add Event</button>
    </div>
    <div class="timeline timeline-container">
      <div class="timeline-container">
        <ul>
          <draggable v-model="tripEvents" :options="{handle:'.handle'}">
    	      <li v-for="tripEvent in tripEvents"><span></span>
              <div>
                <card :tripEvent="tripEvent"></card>
              </div>
              <span class="number">
                <span v-if="tripEvent.startTime"> {{ formatDate(tripEvent.startTime) }}</span> <span></span>
              </span>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import AppNav from './appNav';
import Card from './card';
import { getCards, createCard, updateCard } from '../../utils/api';

export default {
  name: 'timeline',
  components: { AppNav, Card, draggable },
  computed: {
    tripEvents() {
      return this.$store.state.tripEvents;
    },
    users() {
        return this.$store.state.trip.users;
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const strDate = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
      return strDate;
    },
    addEvent() {
      // TODO: switch over to use veux
      const tripId = '6347f1fc-64d1-4f8b-ac79-44d59d130b6d';
      const newTripEvent = createCard(tripId);
      this.tripEvents.unshift(newTripEvent);
      // this.save();
    },
    updateOrders() {
      // TODO: switch over to use veux
      // for (let i = 0; i < this.tripEvents.length; i += 1) {
      //   this.tripEvents[i].order = i;
      // }
    },
    save() {
      // TODO: switch over to use veux
      // this.updateOrders();
      // for (let i = 0; i < this.tripEvents.length; i += 1) {
      //   updateCard(this.tripEvents[i]);
      // }
    },
  },
  created() {
    const tripId = '6347f1fc-64d1-4f8b-ac79-44d59d130b6d';
    this.$store.dispatch('getTripEvents', tripId);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeline {
  text-align: left;
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
