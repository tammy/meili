<!-- HTML -->
<template>
  <div class="online-box">
        <div class="user-row">
          <span>Who's online:</span>
          <div class="avatar" v-for="user in users"><span></span>
            <div class="tooltip2">
              <span class="tooltiptext">{{ user.displayName }}</span>
              <img :src="user.profileImageUrl" :alt="user.displayName" height="50px" width="50px"></img>
            </div>
          </div>
        </div>
  </div>
</template>

<!-- JavaScript -->
<script>

export default {
  name: 'online-now',
  computed: {
    users() {
      var listOfUserData = Object.keys(this.$store.state.onlineUsers).map((key) => {
        return this.$store.state.onlineUsers[key];
      });
      return listOfUserData;
    }
  }
};
</script>

<!-- CSS -->
<style scoped>
.online-box {
  text-align: left;
}

.avatar {
  display: inline-block;
}

/* Space only between elements */
.avatar + .avatar {
  margin-left: 10px;
}

.tooltip2 {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip2 .tooltiptext {
    visibility: hidden;
    background-color: #31708f;
    color: #fff;
    text-align: center;
    height: 50px;
    width: 50px;
 
    position: absolute;
    z-index: 1;
}

.tooltip2:hover .tooltiptext {
    visibility: visible;
}
</style>
