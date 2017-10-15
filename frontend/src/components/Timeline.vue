<template>
	<div class="timeline timeline-container">
    <div class="timeline-container">
      <ul>
        <draggable v-model="itineraryItems">
  	      <li v-for="item in itineraryItems"><span></span>
            <div>
              <card></card>
            </div> <span class="number"><span>10:00</span> <span>12:00</span></span>
          </li>
        </draggable>
      </ul>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import AppNav from './appNav';
import Card from './card';
import { getItineraryData } from '../../utils/api';

export default {
  name: 'timeline',
  components: {
    AppNav,
    Card,
    draggable,
  },
  data() {
    return {
      itineraryItems: [],
    };
  },
  methods: {
    getItineraryData() {
      const dummyId = 12345;
      this.itineraryItems = getItineraryData(dummyId);
    },
  },
  mounted() {
    this.getItineraryData();
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

.timeline-container ul {
  margin: 0;
  margin-top: 100px;
  list-style: none;
  position: relative;
  padding: 1px 100px;
  color: #111;
  font-size: 13px;
}
.timeline-container ul:before {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  border-left: 2px dashed #111;
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
  background: #000;
  left: -30px;
  top: 0;
  position: absolute;
}
.timeline-container ul li > span:before, .timeline-container ul li > span:after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #eee;
  position: absolute;
  background: #86b7e7;
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