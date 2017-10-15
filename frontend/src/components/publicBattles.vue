<!-- HTML -->
<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Your Trip Name Here</h3>
    <hr/>

    <div class="col-sm-4" v-for="event in plan">
      <div class="panel panel-event">
        <div class="panel-heading">
          <h3 class="panel-title"> 
            <input class="textbox text-center" v-model="event.name" placeholder="Event" @click.self="event.focused = true" @blur="event.focused = false">
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
            <input class="textbox" v-model="event.sponsor" placeholder="Location"/>
          </p>
          <p class="field">
            <div class="glyphicon glyphicon-time"></div>
            <input class="textbox" v-model="event.seedFund" placeholder="Time"/>
          </p>
          <p class="field"> 
            <div class="glyphicon glyphicon-pencil"></div>
            <input class="textbox" placeholder="Notes"></input>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- JavaScript -->
<script>
import AppNav from './appNav';
// import { isLoggedIn } from '../../utils/auth';
import { getPublicStartupBattles } from '../../utils/api';

export default {
  name: 'plan',
  components: {
    AppNav,
  },
  data() {
    return {
      plan: '',
    };
  },
  methods: {
    isLoggedIn() {
      return true;
      // return isLoggedIn();
    },
    getItinierary() {
      getPublicStartupBattles().then((battles) => {
        this.plan = battles;
      });
    },
    search() {
      console.log('Searching...');
    },
  },
  mounted() {
    this.getItinierary();
  },
};
</script>

<!-- CSS -->
<style scoped>
.panel-event {
  border-color: #bce8f1;
}

.panel-event .panel-heading {
  color: #31708f;
  background-color: #d9edf7;
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
  margin-left: 5px;
  border: none;
  font-size: 18px;
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