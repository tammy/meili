<!-- HTML -->
<template>
  <div class="online-box">
    <div class="user-row">
      <div v-for="user in users"><span></span>
            <!-- TODO: popover name of the person -->
          <!-- <span id="popoverData" data-toggle="popover" :data-content="user.displayName" data-placement="right" data-trigger="hover"> -->
        <div class="avatar">
          <img :src="user.profileImageUrl" :alt="user.displayName"></img>
        </div>
      </div>
      <div class="avatar add hidden-hover" v-on:click="showCollaboratorModal()">
        <div class="glyphicon glyphicon-plus"></div>
      </div>
    </div>

    <!-- Add Collaborator Modal -->
    <modal name="add-collaborator" height="auto">
      <div style="padding: 20px 30px">
        <h4>Collaborators</h4>
        <hr/>
        <div v-for="colab in collaborators">
          <div class="collaborators">
            {{ colab.name }} ( {{ colab.email }} )
          </div>
        </div>

        <input type="email" v-model="email" placeholder="name@domain.com"></input>
        <button class="btn btn-success" v-on:click="addCollaborator(false)">Add as Collaborator</button>
        <button class="btn btn-success" v-on:click="addCollaborator(true)">Add as Watcher</button>
      </div>
    </modal>
  </div>
</template>


<!-- JavaScript -->
<script>
export default {
  name: 'collaborators',
  data() {
    return {
      email: null,
    };
  },
  computed: {
    users() {
      const listOfUserData = Object.keys(this.$store.state.onlineUsers).map((key) => {
        return this.$store.state.onlineUsers[key];
      });
      return listOfUserData;
    },
    collaborators() {
      return this.$store.state.trip.collaborators;
    },
  },
  methods: {
    showCollaboratorModal() {
      this.$store.dispatch('getCollaborators');
      this.$modal.show('add-collaborator');
    },
    addCollaborator(readOnly) {
      this.$store.dispatch('addCollaborator', {email: this.email, readOnly: readOnly});
    },
  },
};
</script>

<!-- CSS -->
<style scoped>
.alert {
  margin-top: 10px;
}

hr {
  border-color: #bce8f1;
}

input {
  width: calc(100% - 90px);
  margin: 10px 10px 0 10px;
  border: none;
  border-bottom: 3px dashed #bce8f1;
  height: 34px;
}

input:focus {
  outline: none;
}

.collaborators {
  margin-left: 10px;
  font-size: 12pt;
  margin-bottom: 5px;
}

.online-box {
  padding: 10px 0;
  text-align: left;
}

.avatar {
  border: 2px solid #bce8f1;
  border-radius: 50%;
  display: inline-block;
}

img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

/* Space only between elements */
.avatar {
  margin-top: 10px;
}

.add {
  border: 1px solid green;
  width: 40px;
  height: 40px;
  color: green;
  cursor: pointer;
  padding: 10px 0 0 12px;
}

.hidden-hover {
  border: none;
  color: transparent;
}

.hidden-hover:hover {
  color: green;
  border: 1px solid green;
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
