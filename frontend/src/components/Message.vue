<!-- HTML -->
<template>
  <div style="margin-top: 10px">
    <div v-for="message in messages">
      <div class="thread text-left">
        <div class="avatar">
          <img :src="message.authorPicture" :alt="message.authorName" v-if="message.authorPicture"></img>
          <div class="glyphicon glyphicon-user" v-else></div>
        </div>
        <div class="glyphicon glyphicon-chevron-right" style="margin-top: 5px"></div> {{ message.content }}
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
      const messages = this.$store.getters.getMessages(this.threadID);

      if (!messages) {
          return [];
      }
      return messages;
    },
  },
  methods: {},
};
</script>

<!-- CSS -->
<style scoped>
.avatar {
  border: 2px solid #bce8f1;
  border-radius: 50%;
  display: inline-block;
}

img {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.glyphicon-user {
  border-radius: 50%;
  width: 20px;
  height: 20px; 
  margin: 5px 0 0 6px;
}

.glyphicon {
   color: #bce8f1;
   display: inline-block;
}

.thread {
  background-color: transparent;
  margin-bottom: 5px;
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
  padding: 0 10px;
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
