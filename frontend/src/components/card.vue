<!-- HTML -->
<template>
  <div>
      <div class="panel panel-event">
        <div class="panel-heading">
          <h3 class="panel-title">
            <input type="text" class="textbox text-center" v-model="tripEvent.title" placeholder="Event" @click.self="tripEvent.focused = true" @blur="tripEvent.focused = false">
              <button class="glyphicon glyphicon-search search"
                v-show="tripEvent.focused && tripEvent.title"
                v-on:click="search()"
                ></button>
            </input>
          </h3>
        </div>
        <div class="panel-body text-left">
          <p class="field">
            <div class="glyphicon glyphicon-pushpin"></div>
            <input type="text" class="textbox" v-model="tripEvent.location" placeholder="Location"/>
          </p>
          <p class="field">
            <div class="glyphicon glyphicon-time"></div>
            <input class="textbox" v-model="tripEvent.start_time" placeholder="Time"/>
          </p>
          <p class="field" v-if="tripEvent.notes">
            <input type="text" class="textbox" placeholder="Notes"/>
          </p>
        </div>
      </div>
  </div>
</template>

<!-- JavaScript -->
<script>
// import { isLoggedIn } from '../../utils/auth';

export default {
  name: 'cards',
  data() {
    return {};
  },
  props: ['tripEvent'],
  methods: {
    isLoggedIn() {
      return true;
      // return isLoggedIn();
    },
    search() {
      console.log('Searching...');
    },
  },
  mounted() {},
};
</script>

<!-- CSS -->
<style scoped>
.panel {
  border-radius: 0;
  border-color: #bce8f1;
  max-width: 350px;
  margin-bottom: 0px;
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
