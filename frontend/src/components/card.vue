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
          <div class="field">
            <div class="glyphicon glyphicon-pushpin"></div>
            <input type="text" class="textbox" v-model="tripEvent.location" placeholder="Location"/>
          </div>
          <div class="field">
            <div class="glyphicon glyphicon-time"></div>
            <input class="textbox" v-model="tripEvent.startTime" placeholder="Time"/>
          </div>
          <p class="field">
            <input type="text" class="textbox full-width" v-model="tripEvent.description" placeholder="Notes"/>
          </p>
        </div>
      </div>
  </div>
</template>

<!-- JavaScript -->
<script>

export default {
  name: 'card',
  props: ['tripEvent'],
  methods: {
    isLoggedIn() {
      return true;
      // return isLoggedIn();
    },
    search() {
      // TODO: search the card something
    },
  },
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
  padding: 0 7px 10px 7px;
  font-size: 16px;
  text-align: left;
  vertical-align: middle;
  background-color: #FFF;
  color: #000;
  width: 100%;
}

input {
  background-color: transparent;
  /*text-overflow: ;
  white-space: nowrap;
  overflow: hidden;*/
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
  width: calc(100% - 25px);
  border: none;
  font-size: 18px;
  min-height: 20px;
}

.full-width {
  width: 100%;
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
