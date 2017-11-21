<!-- HTML -->
<template>
  <div style="margin-top: 50px">
    <div v-for="thread in threads">
      <div class="thread text-left">
        <h4 class="heading"> {{ thread.topic }}
        <!-- <button class="btn btn-default btn-resolve" v-on:click="resolve(thread)">Resolve</button> -->
        </h4>
        <div class="content">
          {{ thread.content }}
          <message :threadID="thread.id"></message>
          <p class="field">
            <input type="text" class="textbox" placeholder="Reply..." v-model="newMessages[thread.id]"></input>
          </p>
          <button class="btn btn-default btn-reply" v-on:click="reply(thread)">Reply</button>
        </div>
      </div>
    </div>
    <div class="thread text-left">
      <input type="text" class="textbox" placeholder="New thread topic" v-model="newThreadTopic"></input>
      <input type="text" class="textbox" placeholder="New thread contents" v-model="newThreadContent"></input>
      <h4 class="heading create-thread hidden-hover" v-on:click="createThread()">
        <div class="glyphicon glyphicon-plus"></div>
        Create new thread
      </h4>
    </div>
  </div>
</template>

<!-- JavaScript -->
<script>
import Message from './Message';

export default {
  name: 'thread',
  props: ['eventID'],
  components: { Message },
  data() {
    return {
      newThreadTopic: "",
      newThreadContent: "",
      newMessages: {},
      showThread: {},
    };
  },
  computed: {
    threads() {
      const threads = this.$store.getters.getThreads();
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
    reply(thread) {
      console.log(thread);
      this.$store.commit('addMessageToThread', [this.newMessages[thread.id], thread]);
      this.newMessages[thread.id] = "";
    },
    createThread() {
      this.$store.commit('addNewThreadToEvent', [this.newThreadTopic, this.newThreadContent, this.eventID]);
      this.newThreadTopic = "";
      this.newThreadContent = "";
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

.btn-resolve {
  float: right;
  padding: 3px 10px;
  margin-top: -5px;
  margin-right: -18px;
  background-color: white;
  color: #31708f;
  border-color: #31708f;
  font-size: 10pt;
}

.btn-reply {
  float: right;
  padding: 3px 10px;
  margin-top: 0px;
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

.textbox {
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 5px;
  position: relative;
  width: calc(100% - 40px);
  font-size: 18px;
}
</style>
