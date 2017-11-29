<template>
  <nav class="navbar">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link class="navbar-brand" to="/">meili</router-link></a>
    </div>
    <ul class="nav navbar-nav navbar-right" v-show="isLoggedIn()">
      <li><a> {{ name }} <img class="profile" :src="pictureUrl"></a>
        <!-- TODO: make this a dropdown -->
      </li>
      <li>
        <button class="btn btn-danger" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import * as auth from '../../utils/auth';

export default {
  name: 'app-nav',
  data() {
    return {
      name: auth.getUserName(),
      pictureUrl: auth.getProfileThumbnailUrl(),
    };
  },
  methods: {
    handleLogin() {
      auth.login();
    },
    handleLogout() {
      auth.logout();
    },
    isLoggedIn() {
      return auth.isLoggedIn();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  border-bottom: 1px solid #ccc;
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
  background: #f3f3f3;
}

.navbar-brand {
  font-weight: 600;
}

.navbar-right {
  padding-right: 5px;
}

.nav>li>a:focus, .nav>li>a:hover {
  background-color: transparent;
  color: #337ab7;
}

.btn-danger {
  padding: 5px 8px;
  margin: 8px 10px 0 0;
}

.profile {
  border: 1px solid;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-top: -5px;
}
</style>
