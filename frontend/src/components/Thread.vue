<!-- HTML -->
<template>
  <div style="margin-top: 10px">
    <div v-for="thread in threads">
      <div class="thread text-left">
        <h4> {{ thread.topic }}
          <div style="float: right; margin-top: -5px;">
            <div class="avatar">
              <img :src="thread.authorPicture" :alt="thread.authorName" v-if="thread.authorPicture"></img>
              <div class="glyphicon glyphicon-user" v-else></div>
            </div>
          </div>
        </h4>
        <div v-if="true">
          <hr/>
          <div class="content">
            {{ thread.content }}
            <message :threadID="thread.id"></message>
            <input type="text" class="textbox" placeholder="Reply..." style="margin-left: 0px;" v-model="newMessages[thread.id]"></input>
            <button class="btn btn-default btn-reply" v-on:click="reply(thread)">Reply</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Make this a modal? -->
    <!-- <div class="thread text-left">
      
    </div> -->
    <button class="btn btn-success" v-on:click="showCreateThreadModal()">Create Thread</button>

    <!-- Create Thread Modal -->
    <modal name="create-thread" height="auto" @closed="closeModal">
      <div style="padding: 20px 30px">
        <strong>TITLE:</strong> <input type="text" placeholder="New thread topic" v-model="newThreadTopic"></input>      
        <hr/>
        <textarea class="modal-content" placeholder="CONTENT" v-model="newThreadContent">
        </textarea>
        <div style="text-align: center">
          <button class="btn btn-success" v-on:click="createThread()">Create</button>
        </div>
      </div>
    </modal>
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
    // TODO: this is currently not used, because I can't figure out a good place to put this
    resolve(thread) {
      this.$store.commit('resolveThread', thread);
    },
    reply(thread) {
      if (this.newMessages[thread.id]) {
        console.log(thread);
        this.$store.commit('addMessageToThread', [this.newMessages[thread.id], thread]);
        this.newMessages[thread.id] = "";
      } else {
        console.log("Reply is empty!");
        // TODO: give "text is empty" error
      }
    },
    showCreateThreadModal() {
      this.$modal.show('create-thread');
    },
    createThread() {
      if (this.newThreadTopic && this.newThreadContent) {
        this.$store.commit('addNewThreadToEvent', [this.newThreadTopic, this.newThreadContent, this.eventID]);
        this.$modal.hide('create-thread');
        this.closeModal();  
      } else {
        console.log("Thread topic or content is empty!");
        // TODO: give "text is empty" error
      }
    },
    closeModal() {
      this.newThreadTopic = "";
      this.newThreadContent = "";
    },
  },
};
</script>

<!-- CSS -->
<style scoped>

.glyphicon-user {
  border-radius: 50%;
  width: 20px;
  height: 20px; 
  margin: 3px 2px 0 4px;
}

.glyphicon {
  color: #bce8f1;
}

img {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.avatar {
  border: 2px solid #bce8f1;
  border-radius: 50%;
  display: inline-block;
}

input {
  width: calc(100% - 90px);
  margin: 10px 10px 0 10px;
  border: none;
  height: 34px;
}

textarea {
  width: calc(100% - 30px);
  height: 50px;
  margin: 0;
  margin-bottom: 10px;
  border: none;
  outline: none;
  box-shadow: none; 
  resize: none;
}

textarea:focus {
  outline: none;
}

input:focus {
  outline: none;
}

hr {
  margin: 5px 0;
}

.thread {
  background-color: transparent;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px dashed #bce8f1;
}

.thread > h4 {
  padding: 10px;
  margin: 0;
}

.content {
  padding: 10px;
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
  padding: 3px 10px;
  margin-top: 0px;
  margin-right: -18px;
  background-color: white;
  color: #31708f;
  border-color: #31708f;
  font-size: 10pt;
}

.btn-reply:hover {
  padding: 3px 10px;
  margin-top: 0px;
  margin-right: -18px;
  color: white;
  border-color: #31708f;
  font-size: 10pt;
  background-color: #31708f;
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
  background-color: transparent;
  color: transparent;
  border: none;
}

.hidden-hover:hover {
  color: green;
  border: 1px solid green;
  background-color: white;
}
</style>
