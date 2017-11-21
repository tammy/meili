<!-- HTML -->
<template>
  <div style="margin-top: 50px">
    <div v-for="message in messages">
      <div class="thread text-left">
        <div class="content"> {{ message.content }} </div>
      </div>
    </div>
  </div>
</template>

<!-- JavaScript -->
<script>

export default {
  name: 'message',
  props: ['threadID'],
  data() {
    return {
      showMessage: {},
    };
  },
  computed: {
    messages() {
      var messages = this.$store.getters.getMessages(this.threadID);

      if (!messages) {
          return [];
      }
      for (let i = 0; i < messages.length; i += 1) {
        this.showMessage[messages[i].id] = false;
      }
      return messages;
    },
  },
  methods: {},
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
  border: 3px solid #bce8f1;
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
  margin-top: 18px;
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
