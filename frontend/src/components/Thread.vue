<!-- HTML -->
<template>
  <div style="margin-top: 50px">
    <div v-for="thread in threads">
      <div class="thread text-left">
        <h4 class="heading"> {{ thread.title }} 
        <button class="btn btn-default" v-on:click="resolve(thread)">Resolve</button>
        </h4>  
        <div class="content"> {{ thread.content }} </div>
      </div>
    </div>
    <div class="thread text-left" v-on:click="createThread()">
      <h4 class="heading create-thread hidden-hover"> <div class="glyphicon glyphicon-plus"></div>Create new thread </h4>
    </div>
  </div>
</template>

<!-- JavaScript -->
<script>

export default {
  name: 'thread',
  props: ['eventID'],
  data() {
    return {
      showThread: {},
    };
  },
  computed: {
    threads() {
      const threads = this.$store.getters.getThreads(this.eventID);
      for (let i = 0; i < threads.length; i += 1) {
        this.showThread[threads[i].id] = false;
      }
      return threads;
    },
  },
  methods: {
    resolve(thread) {
      this.$store.commit('resolveThread', thread);
    },
    createThread() {
      // TODO
    },
  },
};
</script>

<!-- CSS -->
<style scoped>
.thread {
  background-color: transparent;
  margin-bottom: 10px;
}

.heading {
  padding: 10px 25px;
  color: #31708f;
  background-color: #bce8f1;
  border: 0.5px solid #bce8f1;
  margin: 0;
  cursor: pointer;
}

.content {
  padding: 30px 25px;
  border: 0.5px solid #bce8f1;
  border-top: none;
}

.btn {
  float: right;
  padding: 3px 10px;
  margin-top: -5px;
  margin-right: -18px;
  background-color: white;
  color: #31708f;
  border-color: #31708f;
  font-size: 10pt;
}

.create-thread {
  background: transparent;
  border: 1px solid green;
  color: green;
}

.glyphicon-plus {
  margin-right: 10px;
}

.hidden-hover {
  border: none;
  color: transparent;
}

.hidden-hover:hover {
  color: green;
  border: 1px solid green;
}
</style>
